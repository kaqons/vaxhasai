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

import { Tutorialcomponent } from '../../../modules/tutorialcomponent/domain'

import { Projectcomponent } from '../../../modules/projectcomponent/domain'

@Entity()
export class Uicomponent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  codeSnippet?: string

  @OneToMany(() => Tutorialcomponent, child => child.component)
  tutorialcomponentsAsComponent?: Tutorialcomponent[]

  @OneToMany(() => Projectcomponent, child => child.component)
  projectcomponentsAsComponent?: Projectcomponent[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
