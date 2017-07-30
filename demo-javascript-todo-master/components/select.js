const OPTIONS = ['Low', 'Medium', 'High']

export default ({ onChange, options, value, margin }) =>
  <select
    name="priority"
    onChange={onChange}
    style={{ margin }}
    defaultValue={value || 0}
  >
    {options.map(val =>
      <option key={val} value={val}>
        {`${OPTIONS[val]} priority`}
      </option>
    )}
    <style jsx>{`
      select {
        border: 1px solid #EEEBF3;
        border-radius: 4px;
        appearance: none;
        padding: 20px;
        background: transparent;
        font-size: 1.8rem;
        display: block;
        width: 100%;
        outline: none;
        transition: border .2s ease;
      }
      select:hover {
        border-color: #c4c3c9;
      }
      select:after {
        content: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOSA2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik00LjU5MSA1LjUyMmw0LjM3Mi00LjM4OGMuMDUtLjA1LjA1LS4xMTcgMC0uMTY3TDcuOTk1IDAgNC41OTIgMy40MmEuMTc3LjE3NyAwIDAgMS0uMTgzIDBMMS4wMDUgMCAuMDM4Ljk2N2MtLjA1LjA1LS4wNS4xMTcgMCAuMTY3bDQuMzcgNC4zODhjLjA1LjA1LjEzNC4wNS4xODMgMHoiIGZpbGw9IiM3RTc5OTAiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==);
      }
    `}</style>
  </select>
