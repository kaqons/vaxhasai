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

import { Tutorial } from '../../../modules/tutorial/domain'

import { Uicomponent } from '../../../modules/uicomponent/domain'

@Entity()
export class Tutorialcomponent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  tutorialId: string

  @ManyToOne(() => Tutorial, parent => parent.tutorialcomponents)
  @JoinColumn({ name: 'tutorialId' })
  tutorial?: Tutorial

  @Column({})
  componentId: string

  @ManyToOne(() => Uicomponent, parent => parent.tutorialcomponentsAsComponent)
  @JoinColumn({ name: 'componentId' })
  component?: Uicomponent

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
