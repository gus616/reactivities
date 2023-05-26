import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { Container } from "semantic-ui-react";
import Activity from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid  } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [editMode, setEditMode] = useState<Boolean>(false);

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
    try {
      const response = await axios.get<Activity[]>(`${config.host}/activities`);
      setActivities(response.data);
    } catch (error) {
      console.log(error);
    }
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
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(x=> x.id !== id)]);
  }

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
        />
      </Container>
    </>
  );
}

export default App;
