import "./Analytics.css";
import analyticData from "./analyticsData.json";

function AnalyticsData(props) {
  return (
    <div className="each-box">
      <div>{props.category}</div>
      <div> {props.count}</div>
    </div>
  );
}

function Analytics() {
  return (
    <>
      <div className="title">Analytics</div>
      <div className="big-box">
        {analyticData.map((data) => (
          <AnalyticsData
            key={data.id}
            category={data.category}
            count={data.count}
          />
        ))}
      </div>
    </>
  );
}

export default Analytics;
