'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, Button, Space, Spin } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ProjectDashboardPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [projects, setProjects] = useState<Model.Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (userId) {
      fetchProjects()
    }
  }, [userId])

  const fetchProjects = async () => {
    try {
      const projects = await Api.Project.findManyByUserId(userId, {
        includes: ['files', 'codesnippets', 'projectcomponents'],
      })
      setProjects(projects)
      setLoading(false)
    } catch (error) {
      enqueueSnackbar('Failed to fetch projects', { variant: 'error' })
      setLoading(false)
    }
  }

  const handleCreateProject = () => {
    router.push('/create-project')
  }

  const handleProjectDetails = (projectId: string) => {
    router.push(`/project/${projectId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Project Dashboard</Title>
      <Text type="secondary">
        Here you can manage all your coding projects.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreateProject}
        style={{ margin: '20px 0' }}
      >
        Create New Project
      </Button>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {projects?.map(project => (
            <Col key={project.id} span={8}>
              <Card
                title={project.name}
                bordered={false}
                actions={[
                  <Button
                    key="details"
                    type="link"
                    onClick={() => handleProjectDetails(project.id)}
                  >
                    View Details
                  </Button>,
                ]}
              >
                <Text>{project.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
