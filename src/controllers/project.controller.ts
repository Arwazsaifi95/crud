import { Request, Response } from "express";
import {
  createProjectService,
  deleteProjectService,
  getAllFavouriteProjectService,
  getAllProjectService,
  getAllSharedProjectService,
  getProjectService,
  updateProjectService,
} from "../services/project.services";
import { reqInterface } from "../interfaces/req.interface";


export const createProject = async (req: Request, res: Response) => {
  try {
    const { title,isShared,isFavourite } = req.body;
    const { id } = req.user as reqInterface;
    const image = req.file?.filename || "";

    let response = await createProjectService(title, id, image,isShared,isFavourite);
    res.status(200).json({
      message: "Saved Project successfully",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getProjectService(id)
    res.status(200).json({
      message: "Project",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllFavouriteProject = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const response = await getAllFavouriteProjectService(id);
    res.status(200).json({
      message: "",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllSharedProject = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const response = await getAllSharedProjectService(id);
    res.status(200).json({
      message: "",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};


export const getAllProject = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const response = await getAllProjectService(id)
    res.status(200).json({
      message: "Project",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteProjectService(id);
    res.status(200).json({
      message: "Deleted Project successfully",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title,isShared,isFavourite } = req.body;
    const fileName=req.file?.filename||"";
    const project = await updateProjectService(id, title,fileName,isFavourite,isShared);
    res.status(200).json({
      message: "Updated Project successfully",
      data: project,
    });
  }catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};




