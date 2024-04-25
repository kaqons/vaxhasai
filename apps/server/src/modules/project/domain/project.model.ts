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

import { User } from '../../../modules/user/domain'

import { File } from '../../../modules/file/domain'

import { Codesnippet } from '../../../modules/codesnippet/domain'

import { Projectcomponent } from '../../../modules/projectcomponent/domain'

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  description?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.projects)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => File, child => child.project)
  files?: File[]

  @OneToMany(() => Codesnippet, child => child.project)
  codesnippets?: Codesnippet[]

  @OneToMany(() => Projectcomponent, child => child.project)
  projectcomponents?: Projectcomponent[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
