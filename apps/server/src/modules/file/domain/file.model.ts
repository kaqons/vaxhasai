import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Project } from '../../../modules/project/domain'

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  fileName?: string

  @Column({ nullable: true })
  fileType?: string

  @Column({ nullable: true })
  filePathUrl?: string

  @Column({})
  projectId: string

  @ManyToOne(() => Project, parent => parent.files)
  @JoinColumn({ name: 'projectId' })
  project?: Project

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
