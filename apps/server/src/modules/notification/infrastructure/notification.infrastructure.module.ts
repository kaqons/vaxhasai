import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationProjectSubscriber } from './subscribers/notification.project.subscriber'

import { NotificationFileSubscriber } from './subscribers/notification.file.subscriber'

import { NotificationCodesnippetSubscriber } from './subscribers/notification.codesnippet.subscriber'

import { NotificationUicomponentSubscriber } from './subscribers/notification.uicomponent.subscriber'

import { NotificationTutorialSubscriber } from './subscribers/notification.tutorial.subscriber'

import { NotificationTutorialcomponentSubscriber } from './subscribers/notification.tutorialcomponent.subscriber'

import { NotificationProjectcomponentSubscriber } from './subscribers/notification.projectcomponent.subscriber'

import { NotificationInteractionSubscriber } from './subscribers/notification.interaction.subscriber'

import { NotificationEducationalresourceSubscriber } from './subscribers/notification.educationalresource.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationProjectSubscriber,

    NotificationFileSubscriber,

    NotificationCodesnippetSubscriber,

    NotificationUicomponentSubscriber,

    NotificationTutorialSubscriber,

    NotificationTutorialcomponentSubscriber,

    NotificationProjectcomponentSubscriber,

    NotificationInteractionSubscriber,

    NotificationEducationalresourceSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
