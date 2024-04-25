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

import { Uicomponent } from '../../../modules/uicomponent/domain'

@Entity()
export class Projectcomponent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  projectId: string

  @ManyToOne(() => Project, parent => parent.projectcomponents)
  @JoinColumn({ name: 'projectId' })
  project?: Project

  @Column({})
  componentId: string

  @ManyToOne(() => Uicomponent, parent => parent.projectcomponentsAsComponent)
  @JoinColumn({ name: 'componentId' })
  component?: Uicomponent

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
