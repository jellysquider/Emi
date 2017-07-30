const Dot = () =>
  <span>
    <style jsx>
      {`
        span {
          height: 8px;
          width: 8px;
          border-radius: 50%;
          background: black;
          margin: 2px;
          display: inline-block;
        }
      `}
    </style>
  </span>

export default ({ priority }) =>
  <div>
    {[...Array(priority + 1).keys()].map((_, i) => <Dot key={i} />)}
    <style jsx>
      {`
        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `}
    </style>
  </div>
