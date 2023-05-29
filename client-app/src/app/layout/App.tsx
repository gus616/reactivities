import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import Activity from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const onSelectActivityHandler = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  const onCancelSelectHandler = () => {
    setSelectedActivity(undefined);
  };

  const fetchActivities = async () => {
    agent.Activities.list()
      .then((response) => {
        let activities: Activity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split("T")[0];
          activities.push(activity);
        });
        setActivities(response);
        setLoading(false);
      })
      .catch((err) => {});
  };
  const handleFormOpen = (id?: string) => {
    id ? onSelectActivityHandler(id) : onCancelSelectHandler();
    setEditMode(true);
  };

  const handleNavbarCreateForm = () => {
    onCancelSelectHandler();
    handleFormOpen();
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  };

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);

    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
   
  };

  if (loading)
    return <LoadingComponents content="Loading ..." inverted={true} />;

  return (
    <>
      <NavBar openForm={handleNavbarCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={onSelectActivityHandler}
          cancelSelectActivity={onCancelSelectHandler}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
