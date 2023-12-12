const express = require("express");
const app = express();
const { data } = require("./data/data.js");
const PORT = 8000;

app.use(express.json());

//create
app.post("/", async (req, res) => {
  const { id, name, description, status } = req.body;
  data.push({ id, name, description, status });

  res.json({
    message: "Data added successfully",
    newData: { id, name, description, status },
  });
});

// list all

app.get("/", async (req, res) => {
  const newData = data.map((e) => e);

  res.json({ message: "Data listed successfully", newData });
});

//Display details of a specific task based on its ID.
app.post("/", async (req, res) => {
    const { id } = req.body;
  const newData = data.filter((e)=>e.id==id)

  res.json({ message: "successfully Display details of a specific task", newData });
});

app.listen(8000, () => {
  console.log(`server running @ ${PORT}`);
});



// Delete a specific task based on its ID.

app.delete("/", async (req, res) => {
    const {id}=req.body
    const taskId = parseInt(id);
    const deletedTask = data.find((task) => task.id === taskId);
  
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
  
    
    data = data.filter((task) => task.id !== taskId);
  
    res.json({ message: "Task successfully deleted", deletedTask });
});


// Update the details of a specific task based on its ID. Allow updating the task name, description, and status.
app.delete("/:id", async (req, res) => {
    const taskId = parseInt(req.params.id);
    const { name, description, status } = req.body;
  
    const updatedTaskIndex = data.findIndex((task) => task.id === taskId);
  
    if (updatedTaskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }
  

    data[updatedTaskIndex] = {
      ...data[updatedTaskIndex],
      name: name || data[updatedTaskIndex].name,
      description: description || data[updatedTaskIndex].description,
      status: status || data[updatedTaskIndex].status,
    };
  
    res.json({ message: "Task details successfully updated", updatedTask: data[updatedTaskIndex] });
});