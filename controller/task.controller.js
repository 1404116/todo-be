const Task = require("../model/Task");

const taskController = {};

// Insert
taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const newTask = new Task({ task, isComplete });
        await newTask.save();
        res.status(200).json({ status: "ok", data: newTask });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err });
    }
};

// Select
taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({ status: "ok", data: taskList });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err });
    }
};

// Update
taskController.updateTask = async (req, res) => {
    try {
        const { id } = req.params; // 파라미터에서 데이터 가져옴
        const { task, isComplete } = req.body;

        // 주어진 ID로 Task를 업데이트
        const updateTask = await Task.findByIdAndUpdate(
            id, // 조건
            { task, isComplete }, // 업데이트 내용
            { new: true } // 업데이트된 문서를 반환
        );

        if (!updateTask) {
            return res.status(500).json({ status: "fail" });
        }

        res.status(200).json({ status: "ok", data: updateTask });
    } catch (err) {
        res.status(400).json({ status: "fail", error: err });
    }
};

// taskController.updateTask = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { task, isComplete } = req.body;
//         // const newTask = new Task({ task, isComplete });
//         // await newTask.findById({ task, isComplete }).updateTask();
//         // const updateTask = await Task.findOneAndUpdate(
//         //     { task, isComplete },
//         //     req.body,
//         //     { fdasfds: true }
//         // );

//         const updateTask = await Task.findByIdAndUpdate(
//             id,
//             { task, isComplete },
//             { new: true }
//         );
//         res.status(200);

//         // await Task.findOne({ id: req.params });
//     } catch (err) {
//         res.status(400);
//     }
// };

//Delete
taskController.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await Task.deleteOne({ _id: id }); // mongoDB의 _id는 object 타입이어서 key : value 조건으로 사용

        // if (!deleteTask) {
        // deleteOne은 데이터 반환 값이 null이나 undefined으로 반환 하지 않고 불리언과 카운트 객체로 반환
        if (deleteTask.deletedCount == 0) {
            return res.status(500).json({ status: "fail" });
        }

        res.status(200).json({ status: "ok", data: "삭제완료" + deleteTask });
    } catch (err) {
        res.status(400).json({ status: "fail", data: err });
    }
};

taskController.updateComplete = async (req, res) => {
    try {
        const taskId = await Task.findById(req.params.id);
        console.log("updateComplete : ", taskId);

        taskId.isComplete = !taskId.isComplete;
        await taskId.save();
        res.status(200).json({ status: "ok", data: taskId });
    } catch (err) {
        res.status(400).json({ status: "fail", data: err });
    }
};

module.exports = taskController;
