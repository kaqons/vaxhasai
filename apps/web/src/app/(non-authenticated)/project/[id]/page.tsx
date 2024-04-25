'use client'

import { useEffect, useState } from 'react'
import { Typography, Descriptions, Card, Col, Row, Space, Button } from 'antd'
import { FileOutlined, CodeOutlined, AppstoreOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ProjectDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [project, setProject] = useState<any>(null)
  const [files, setFiles] = useState<any[]>([])
  const [codeSnippets, setCodeSnippets] = useState<any[]>([])
  const [uiComponents, setUiComponents] = useState<any[]>([])

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectData = await Api.Project.findOne(params.id, {
          includes: [
            'user',
            'files',
            'codesnippets',
            'projectcomponents.component',
          ],
        })
        setProject(projectData)
        setFiles(projectData.files || [])
        setCodeSnippets(projectData.codesnippets || [])
        setUiComponents(
          projectData.projectcomponents?.map((pc: any) => pc.component) || [],
        )
      } catch (error) {
        enqueueSnackbar('Failed to fetch project details', { variant: 'error' })
      }
    }

    if (params.id) {
      fetchProjectDetails()
    }
  }, [params.id])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Project Details</Title>
      {project && (
        <Descriptions bordered>
          <Descriptions.Item label="Name">{project.name}</Descriptions.Item>
          <Descriptions.Item label="Description">
            {project.description}
          </Descriptions.Item>
          <Descriptions.Item label="Created">
            {dayjs(project.dateCreated).format('DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated">
            {dayjs(project.dateUpdated).format('DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Owner">
            {project.user?.name}
          </Descriptions.Item>
        </Descriptions>
      )}

      <Title level={3}>Files</Title>
      <Row gutter={[16, 16]}>
        {files.map((file: any) => (
          <Col span={8} key={file.id}>
            <Card
              title={file.fileName}
              bordered={false}
              actions={[<FileOutlined key="file" />]}
            >
              <Text>Type: {file.fileType}</Text>
              <br />
              <Text>
                Uploaded: {dayjs(file.dateCreated).format('DD/MM/YYYY')}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={3}>Code Snippets</Title>
      {codeSnippets.map((snippet: any) => (
        <Card
          key={snippet.id}
          title={<Text code>{snippet.id}</Text>}
          bordered={false}
          actions={[<CodeOutlined key="code" />]}
        >
          <Paragraph copyable>{snippet.codeContent}</Paragraph>
        </Card>
      ))}

      <Title level={3}>UI Components</Title>
      <Row gutter={[16, 16]}>
        {uiComponents.map((component: any) => (
          <Col span={8} key={component.id}>
            <Card
              title={component.name}
              bordered={false}
              actions={[<AppstoreOutlined key="component" />]}
            >
              <Paragraph>{component.codeSnippet}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      <Space>
        <Button onClick={() => router.push('/projects')}>
          Back to Projects
        </Button>
      </Space>
    </PageLayout>
  )
}
