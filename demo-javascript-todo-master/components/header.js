import SortBy from './sortby'

export default ({ heading, sort, onSortClick }) =>
  <header>
    <div className="wrap">
      <h1>{heading}</h1>
      <div className="right">
        <SortBy selected={sort} onClick={onSortClick} />
      </div>
    </div>
    <style jsx>
      {`
        header {
          height: 80px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #EEEBF3;
          flex: 0 0 80px;
        }
        .wrap {
          width: 100%;
          margin-left: 60px;
          margin-right: 130px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        h1 {
          margin: 0;
          font-size: 2.4rem;
          font-weight: 600;
        }
      `}
    </style>
  </header>
