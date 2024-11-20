import { AnyError } from "typeorm";
import AppDataSource from "../config/database.config";
import { Folder } from "../entity/folder.model";
import { Request, Response } from "express";

const folderRepository = AppDataSource.getRepository(Folder);

export const createFolderService = async (
  title: string,
  isShared: boolean,
  isFavourite: boolean,
  id: string
) => {
  try {
    const existingFolderName = await folderRepository.findOneBy({
      title,
    });
    if (existingFolderName) {
      throw new Error("Folder with same name already exists");
    }
    const folder = folderRepository.create({
      title,
      userId: id,
      isShared,
      isFavourite,
    });
    const savedFolder = await folderRepository.save(folder);
    return savedFolder;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const getFolderService = async (id: string) => {
  try {
    const folder = await folderRepository.findOneBy({
      id: id,
    });
    if (!folder) {
      throw new Error("Folder Not Found");
    }
    return folder;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const getAllFavouriteFolderService = async (id: string) => {
  try {
    const data = await folderRepository.find({
      where: {
        userId: id,
        isFavourite: true
      }
    });
    if (data.length === 0) {
      throw new Error("No data Found");
    }
    return data;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const getAllSharedFolderService = async (id: string) => {
  try {
    const data = await folderRepository.find({
      where: {
        userId: id,
        isShared: true
      }
    });
    if (data.length === 0) {
      throw new Error("No data Found");
    }
    return data;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const getAllFolderByUserIdService = async (filters:any) => {
  try {
    const folder = await folderRepository.findBy(filters);
    if (folder.length === 0) {
      throw new Error("No data Found");
    }
    return folder;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

// export const getAllFolderIsSharedService = async (id: string) => {
//   try {
//     const folder = await folderRepository.findBy({ userId: id });
//     if (folder.length == 0) {
//       throw new Error("No data Found");
//     }
//     return folder;
//   } catch (error: unknown) {
//     if (typeof error === "object" && error) {
//       if ("message" in error)
//         throw new Error(error?.message as unknown as string);
//     }
//     throw new Error("Internal Server error");
//   }
// };

export const deleteFolderService = async (id: string) => {
  try {
    const folder = await folderRepository.findOneBy({
      id,
    });
    if (!folder) {
      throw new Error("Folder Not Found");
    }
    await folderRepository.delete({ id });
    return folder;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};

export const updateFolderService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, isShared, isFavourite } = req.body;
    let folder = await folderRepository.findOneBy({ id });
    if (!folder) {
      throw new Error("Project Not Found");
    }
    folder.title = title || folder.title;
    folder.isShared = isShared || folder.isShared;
    folder.isFavourite = isFavourite || folder.isFavourite;
    const savedFolder = await folderRepository.save(folder);
    return savedFolder;
  } catch (error: unknown) {
    if (typeof error === "object" && error) {
      if ("message" in error)
        throw new Error(error?.message as unknown as string);
    }
    throw new Error("Internal Server error");
  }
};
