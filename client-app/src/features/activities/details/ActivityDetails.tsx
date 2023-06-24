import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { observer } from "mobx-react-lite";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailSidebar from "./ActivityDetailSidebar";

const ActivityDetails = () => {
  let { id } = useParams();
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial || !activity) {
    return (
      <LoadingComponents inverted={false} content={"Loading details..."} />
    );
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity}/>
        <ActivityDetailInfo activity={activity} />
        <ActivityDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
