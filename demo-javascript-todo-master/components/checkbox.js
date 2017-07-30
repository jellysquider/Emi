export default ({ checked = true, name, onChange }) =>
  <div>
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
    <style jsx>
      {`
        input {
          appearance: none;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 4px;
          position: relative;
          border: 2px solid #EEEBF3;
          cursor: pointer;
          outline: none;
          transition: border .2s ease;
        }
        input:hover {
          border-color: #CF4647;
        }
        input:checked {
          background: #CF4647;
          border: 2px solid #CF4647;
        }
        input:checked:after {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          content: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyMCAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTcuNzUgMTFMMS45ODQgNS4zOS43NSA2LjYyNmw3IDYuOTk5TDE5LjU2MiAxLjgxMiAxOC4zMy41OHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==);
        }
      `}
    </style>
  </div>
