import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Folder } from "./folder.model";
@Entity()
export class FolderFile {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  folderId!: string;

  @Column({default:false})
  isFavourite!: boolean;

  @Column({default:false})
  isShared!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Folder, (folder) => folder.folderFile)
  @JoinColumn({ name: "folderId" })
  folder!: Folder;
}
