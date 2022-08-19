import {
  Button,
  Container,
  Text,
  Title,
  Modal,
  TextInput,
  Group,
  Card,
  ActionIcon,
} from "@mantine/core";
import { useState, useRef, useEffect } from "react";
import { Trash } from "tabler-icons-react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [opened, setOpened] = useState(false);

  const taskTitle = useRef("");
  const taskSummary = useRef("");

  function createTask() {
    setTasks([
      ...tasks,
      {
        title: taskTitle.current.value,
        summary: taskSummary.current.value,
      },
    ]);

    saveTasks([
      ...tasks,
      {
        title: taskTitle.current.value,
        summary: taskSummary.current.value,
      },
    ]);
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function deleteTask(index) {
    var clonedTasks = [...tasks];

    clonedTasks.splice(index, 1);

    setTasks(clonedTasks);

    saveTasks([...clonedTasks]);
  }

  function loadTasks() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="App">
      <Modal
        opened={opened}
        size={"xl"}
        title={"New Task"}
        withCloseButton={true}
        onClose={() => {
          setOpened(false);
        }}
        centered
      >
        <TextInput
          mt={"md"}
          ref={taskTitle}
          placeholder={"Task Title"}
          required
          label={"Title"}
        />
        <TextInput
          ref={taskSummary}
          mt={"md"}
          placeholder={"Task Summary"}
          label={"Summary"}
        />
        <Group mt={"md"} position={"apart"}>
          <Button
            onClick={() => {
              setOpened(false);
            }}
            variant={"subtle"}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              createTask();
              setOpened(false);
            }}
          >
            Create Task
          </Button>
        </Group>
      </Modal>
      <Container size={600} my={40}>
        <Group position={"apart"}>
          <Title
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            My Tasks
          </Title>
          <ActionIcon color={"blue"} size="lg"></ActionIcon>
        </Group>
        {tasks.length > 0 ? (
          tasks.map((task, index) => {
            if (task.title) {
              return (
                <Card withBorder key={index} mt={"sm"}>
                  <Group position={"apart"}>
                    <Text weight={"bold"}>{task.title}</Text>
                    <ActionIcon
                      onClick={() => {
                        deleteTask(index);
                      }}
                      color={"red"}
                      variant={"transparent"}
                    >
                      <Trash />
                    </ActionIcon>
                  </Group>
                  <Text color={"dimmed"} size={"md"} mt={"sm"}>
                    {task.summary
                      ? task.summary
                      : "No summary was provided for this task"}
                  </Text>
                </Card>
              );
            }
          })
        ) : (
          <Text size={"lg"} mt={"md"} color={"dimmed"}>
            You have no tasks
          </Text>
        )}
        <Button
          onClick={() => {
            setOpened(true);
          }}
          fullWidth
          mt={"md"}
        >
          New Task
        </Button>
      </Container>
    </div>
  );
}