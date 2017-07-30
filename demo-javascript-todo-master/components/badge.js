export default ({ children, type, margin }) =>
  <span className={`badge ${type}`} style={{ margin }}>
    {children}
    <style jsx>
      {`
        .badge {
          border-radius: 4px;
          font-size: 1.2rem;
          font-weight: 400;
          padding: 3px 10px;
          vertical-align: middle;
          display: inline-block;
          min-width: 40px;
          text-align: center;
        }
        .badge.other {
          background-color: #C9EFB5;
          color: #6CB136;
        }
        .badge.work {
          background-color: #FED8DA;
          color: #CF4647;
        }
        .badge.home {
          background-color: #D3E9FD;
          color: #3F91EB;
        }
      `}
    </style>
  </span>
