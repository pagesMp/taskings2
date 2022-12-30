import { log } from 'console';
import { Request, Response } from 'express';
import { TaskModel } from '../models/Task';

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    try {
        const allTasks: TaskModel[] = await TaskModel.findAll({ where: { userId: response.locals.user.id }});        
        return response.status(200).json(allTasks);
    } catch (error) {
        return response.status(500).json({ message: error });
    }
}

export const get = async (request: Request, response: Response): Promise<Response> => {
    try {
        const { id } = request.params;
        const task: TaskModel | null = await TaskModel.findByPk(id);
        if (task === null) {
            throw 'Task not found';
        }
        return response.status(200).json({ message: 'Task retrieved successfully', data: task });
    } catch (error) {
        return response.status(500).json({ message: error });
    }
};

export const create = async (request: Request, response: Response): Promise<Response> => {
    try {
        const title: string = request.body.title;
        const description: string = request.body.description;

        if (!title) {
            throw new Error('Title cannot be empty');
        };

        const newTask = new TaskModel({ "title": title, "description": description, "completed": false, "userId": response.locals.user.id });
        await newTask.save();
        return response.status(200).json({ message: 'Task created successfully', data: newTask });
    } catch (error: any) {
        return response.status(500).json({ message: error.message });
    }
};

export const update = async (request: Request, response: Response): Promise<Response> => {
    try {
        const title: string = request.body.title;
        const description: string = request.body.description;
        const completed: boolean = request.body.completed;
        const { id } = request.params;

        if (!title || !id || !completed) {
            throw new Error('Required parameter cannot be empty');
        };

        await TaskModel.update({ "title": title, "description": description, "completed": completed }, { where: { id }});
        return response.status(200).json({ message: `Task ${id} updated successfully` });

    } catch (error: any) {
        return response.status(500).json({ message: error.message });
    }
};

export const remove = async (request: Request, response: Response): Promise<Response> => {
    try {
        const { id } = request.params;

        const task: TaskModel | null = await TaskModel.findByPk(id);
        if (task !== null) {
            await task.destroy();
            return response.status(200).json({ message: `Task ${id} deleted successfully` });
        } else {
            throw new Error('Failed to remove this task');
        }

    } catch (error: any) {
        return response.status(500).json({ message: error.message });
    }
};