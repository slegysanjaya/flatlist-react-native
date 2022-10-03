import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { 
  StyleSheet,
  View,
  FlatList, 
  Button
} from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  
  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals, 
      {
        text: enteredGoalText, 
        id: Math.random().toString() 
      }
    ]);
    endAddGoalHandler()
  };

  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  function startAddGoalHandler() {
    console.log('masuk sini')
    setModalIsVisible(true)
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }
  
  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <Button 
          title='Add New Goal' 
          color="#a065ec" 
          onPress={startAddGoalHandler}
        />

        <GoalInput 
          visible={modalIsVisible} 
          onAddGoal={addGoalHandler} 
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList 
            data={courseGoals} 
            renderItem={(itemData) => {
              return (
                <GoalItem 
                  text={itemData.item.text} 
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler} 
                />
              )
            }} 
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false} 
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50
  },
  
  goalsContainer: {
    flex: 5
  }
});
