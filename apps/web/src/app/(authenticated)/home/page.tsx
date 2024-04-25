'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Avatar, Button } from 'antd'
import { UserOutlined, ProjectOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [interactions, setInteractions] = useState([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User not found, please login.', { variant: 'error' })
      return
    }

    const fetchData = async () => {
      try {
        const userData = await Api.User.findOne(userId, {
          includes: ['projects', 'interactions'],
        })
        setUser(userData)
        setProjects(userData.projects || [])
        const today = dayjs()
        const filteredInteractions = (userData.interactions || []).filter(interaction =>
          dayjs(interaction.dateCreated).date() === today.date() &&
          dayjs(interaction.dateCreated).month() === today.month()
        )
        setInteractions(filteredInteractions)
      } catch (error) {
        enqueueSnackbar('Failed to fetch user data.', { variant: 'error' })
      }
    }

    fetchData()
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Welcome to HyperAI</Title>
      <Text>
        Quickly access all major features and overview your activities.
      </Text>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card title="Your Profile" bordered={false}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              src={user?.pictureUrl}
            />
            <Text strong>{user?.name}</Text>
            <Text type="secondary">{user?.email}</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Projects"
            bordered={false}
            actions={[
              <Button type="link" onClick={() => router.push('/projects')}>
                View Projects
              </Button>,
            ]}
          >
            <ProjectOutlined style={{ fontSize: '24px' }} />
            <Text>{projects.length} Projects</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Notifications" bordered={false}>
            <Text>No notifications available</Text>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card title="Recent Interactions" bordered={false}>
            {interactions.slice(0, 10).map(interaction => (
              <Text key={interaction.id}>
                {dayjs(interaction.dateCreated).format('YYYY-MM-DD HH:mm')} -{' '}
                {interaction.input}
              </Text>
            ))}
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}