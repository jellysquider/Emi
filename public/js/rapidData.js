const RAPID_TODO_COLLECTION_NAME = 'MediEmi';

//module.exports {

function stuff() {

  $('#nav :checkbox').change(function() {
      // this will contain a reference to the checkbox
      if (this.checked) {
          // the checkbox is now checked
          $("#onetwo").insertBefore("#threeone");
      } else {
          // the checkbox is now no longer checked
      }
  });

}

function getUUID() {

  var uuid = uuidv4(); // -> v4 UUID
  Lockr.prefix = 'lockr';
  try {
    var userID = Lockr.get('uuid');
    console.log("first uuid!" + userID);
  }
  catch(e) {
    console.log(e.name + ': ' + e.message);
    Lockr.set('uuid', uuid);
  }
  if(userID == null) {
    Lockr.set('uuid', uuid);
    alert("The user is not logged in!");
  }
  var userID = Lockr.get('uuid');
  console.log("uuid:" + uuid + " :" + userID);
  return userID;
}

function profileData() {
  console.log("hello!")
  //var socket = io.connect('http://localhost:3000');
  //myStorage = window.localStorage;
  console.log("Hi!");
  var totalData = {};
  totalData.uuid = getUUID();
  $('#curStatus').click(function(e){
    //e.preventDefault();
    console.log("button clicked!");
    var idClicked = e.target.id;
    totalData.status = idClicked;
    console.log(totalData.status);
  });
  $('#originCountry').change(function(e){
    //e.preventDefault();
    console.log("button clicked!");
    totalData.originCountry = $("#originCountry option:selected").text();
    console.log(totalData.originCountry);
  });
  $('#occupation').change(function(e){
    //e.preventDefault();
    console.log("button clicked!");
    totalData.occupation = $("#occupation option:selected").text();
    console.log(totalData.occupation);
  });
  $('#DOB').change(function(e){
    //e.preventDefault();
    console.log("DOB entered!");
    totalData.DOB = $("#DOB").val();
    console.log(totalData.DOB);
  });
  $('#gender').change(function(e){
    //e.preventDefault();
    console.log("button clicked!");
    totalData.gender = $("#gender option:selected").text();
    console.log(totalData.gender);
  });
  $('#famSize').click(function(e){
    //e.preventDefault();
    console.log("button clicked!");
    var idClicked = e.target.id;
    totalData.famSize = idClicked;
    console.log(totalData.famSize);
  });
  $('#submitBtn').click(function(e){
    //e.preventDefault();
    console.log("button clicked!");
    saveProfileData(totalData);
    window.location.replace("http://localhost:3000/results");
  });


}

function saveProfileData(msg) {
  console.log("saveProfileData:" + msg);

  client
    .collection(RAPID_TODO_COLLECTION_NAME)
    .filter({ and: [
            { $id: msg.uuid }
            ]})
    .fetch(userData =>  {
      //socket.emit("userData", userData[0].body);
      try {
        console.log(JSON.stringify(userData[0].body));
        console.log(JSON.stringify(msg));
        var tmp = deepmerge(msg, userData[0].body);
        msg = tmp;
        console.log(JSON.stringify(msg));
      }
      catch(e) {
        console.log(e.name + ': ' + e.message);
      }

      client
        .collection(RAPID_TODO_COLLECTION_NAME)
        .document(msg.uuid)
        .mutate({ // create a new to-do and assign it to John
          name: msg.name,
          email: msg.email,
          phone: msg.phone,
          gender: msg.gender,
          canDrive: msg.canDrive,
          isDisabled: msg.isDisabled,
          isMinority: msg.isMinority,
          isLiterate: msg.isLiterate,
          status: msg.status,
          originCountry: msg.originCountry,
          isEducated: msg.isEducated,
          priority: msg.priority,
          famSize: msg.famSize,
          DOB: msg.DOB,
          occupation: msg.occupation
      })
      .then(
        () => console.log('success'),
        err => {
          if (err) {
            console.log(err.message);
            switch (err.type) {
              case 'timeout': break // mutation timed out
              case 'permission-denied': break // access control related error
            }
          }
        })

    }, error => {
      // once the error block is called the subscription is automatically canceled
      // and will no longer receive and updates
      console.log(err.message)
      if (err.type === 'permission-denied') {
        console.log(err.message) // you are not allowed to access data
      }
    })
}

function contactUs() {

  $('#contactForm').submit(function(e){
    e.preventDefault();
    console.log("yaay!");
    console.log("button clicked!");
    var data = $("#contactForm :input");//.serializeArray();
    //alert(data);
    var values = {
                name: data[0].value,
                email: data[1].value,
                phone: data[2].value,
                msg: data[3].value
    }
    //socket.emit('contactUs', values);
    console.log("sent! and button data:" + data[0].value);

    var msg = data[0].value;

    console.log("contactUs:" + msg);

    client
      .collection(RAPID_TODO_COLLECTION_NAME)
      .newDocument()
      .mutate({ // create a new to-do and assign it to John
        name: msg.name,
        email: msg.email,
        phone: msg.phone,
        msg: msg.msg
    })
    .then(
      () => console.log('success'),
      err => {
        if (err) {
          switch (err.type) {
            case 'timeout': break // mutation timed out
            case 'permission-denied': break // access control related error
          }
        }
      })

    //$('#success').val('');
    return false;
  });

}

function getUserData(sortEPI) {

  console.log("Entered getUserData");

  client
    .collection(RAPID_TODO_COLLECTION_NAME)
    .filter({ and: [
            { $id: getUUID() }
            ]})
    .fetch(userData =>  {
      //socket.emit("userData", userData[0].body);
      console.log(JSON.stringify(userData[0].body));
      return getSearchResults(userData[0].body, sortEPI);
    }, error => {
      // once the error block is called the subscription is automatically canceled
      // and will no longer receive and updates
      console.log(err.message)
      if (err.type === 'permission-denied') {
        console.log(err.message) // you are not allowed to access data
      }
    })

}

function getSearchResults(msg, sortEPI) {

  //var msg = getUserData({uuid: getUUID()});

  var searchCriteria = {canDrive: true, isDisabled: true, isLiterate: true, status: true};

  console.log('searchSettings!');
  console.log('msg data:' + JSON.stringify(msg, 2, 0));
  Object.keys(msg).forEach(function(k) {
    if(searchCriteria.hasOwnProperty(k)) {
        console.log("searchCriteria contains:" + k);
    } else {
      if(k != "priority") {
        delete msg[k];
    }
    }
});

var and = [
          { canDrive: msg.canDrive },
          { isDisabled: msg.isDisabled },
          { isMinority: msg.isMinority },
          { isLiterate: msg.isLiterate },
          { originCountry: msg.originCountry },
          { isEducated: msg.isEducated },
          { status: {cnt: msg.status}},
]

var pri = [
          { priority: 'asc' },
          { EPI: 'asc' },
]

if(!sortEPI) {
  delete pri[1];
}

var filteredAnd = and.filter(obj => {
  const key = Object.keys(obj)[0]
  console.log(obj)
  if(obj[key] !== undefined) {
    try {
    if(obj[key][0][0] != undefined && obj[key][0].length != 0 && obj[key][0].constructor === Object) {
      return obj[key];
  }}
  catch(e) {
    console.log(e.message);
  }
  if(obj[key] !== undefined) {
    return obj[key];
  }
  }
})

var filteredPri = pri.filter(obj => {
  const key = Object.keys(obj)[0]
  console.log(obj)
  if(obj[key] !== undefined) {
    return obj[key];
  }
})

console.log('msg data:' + JSON.stringify(msg, 2, 0));

  client
    .collection(RAPID_TODO_COLLECTION_NAME)
    .filter({ and: filteredAnd })
    .order({ and: filteredPri })
    .fetch(todos => {
      // TODO: update user interface
      console.log("Todos data:", JSON.stringify(todos));
      console.log("Todos data:", JSON.stringify(todos[0].body.countryName));
      if( Object.prototype.toString.call(msg) === '[object Array]' ) {
        console.log( 'Array ahoy!' );
      }
      console.log("length:" + todos.length);

      if(todos != null) {
        for(var i = 0; i < todos.length; i++) {
          console.log(todos[i].body);
          //socket.emit('searchResults', todos[i].body);
      }
      return todos;
      }
    /*  for (var key in todos) {
        if (todos.hasOwnProperty(key)) {
          console.log(key + " -> " + todos[key]);
            for (var key1 in todos[key]) {
              if (todos[key].hasOwnProperty(key1)) {
                console.log(key1 + " -> " + todos[key][key1]);
                for (var key2 in todos[key][key1]) {
                  if (todos[key][key1].hasOwnProperty(key2)) {
                    console.log(key2 + " -> " + todos[key][key1][key2]);
                  }
                }
              }
            }
        }
      }*/
      //console.log("Country name:" + todos[0].body.countryName);
    }, error => {
      // once the error block is called the subscription is automatically canceled
      // and will no longer receive and updates
      console.log(err.message)
      if (err.type === 'permission-denied') {
        console.log(err.message) // you are not allowed to access data
      }
    })
    console.log("Done with rapid io! ^-^")

}

//}
