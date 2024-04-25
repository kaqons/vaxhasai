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
export class Codesnippet {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  codeContent?: string

  @Column({})
  projectId: string

  @ManyToOne(() => Project, parent => parent.codesnippets)
  @JoinColumn({ name: 'projectId' })
  project?: Project

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
