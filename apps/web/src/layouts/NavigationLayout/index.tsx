import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Topbar } from './components/Topbar/index.layout'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  const itemsLeftbar = []

  const itemsUser = []

  const itemsTopbar = [
    {
      key: '/home',
      label: 'Home',
      onClick: () => goTo('/home'),
    },

    {
      key: '/ai-assistant',
      label: 'AI Assistant',
      onClick: () => goTo('/ai-assistant'),
    },

    {
      key: '/projects',
      label: 'Projects',
      onClick: () => goTo('/projects'),
    },

    {
      key: '/create-project',
      label: 'Create Project',
      onClick: () => goTo('/create-project'),
    },

    {
      key: '/ui-components',
      label: 'UI Components',
      onClick: () => goTo('/ui-components'),
    },

    {
      key: '/tutorials',
      label: 'Tutorials',
      onClick: () => goTo('/tutorials'),
    },

    {
      key: '/educational-resources',
      label: 'Learn',
      onClick: () => goTo('/educational-resources'),
    },
  ]

  const itemsSubNavigation = [
    {
      key: '/home',
      label: 'Home',
    },

    {
      key: '/ai-assistant',
      label: 'AI Assistant',
    },

    {
      key: '/projects',
      label: 'Projects',
    },

    {
      key: '/project/:id',
      label: 'Project Details',
    },

    {
      key: '/create-project',
      label: 'Create Project',
    },

    {
      key: '/ui-components',
      label: 'UI Components',
    },

    {
      key: '/tutorials',
      label: 'Tutorials',
    },

    {
      key: '/educational-resources',
      label: 'Learn',
    },

    {
      key: '/project/:id/upload',
      label: 'Upload Files',
    },

    {
      key: '/project/:id/code-snippet',
      label: 'Code Snippets',
    },
  ]

  const itemsMobile = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
