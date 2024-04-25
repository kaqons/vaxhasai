'use client'

import { useEffect, useState } from 'react'
import { Button, Input, Modal, Typography, List, Space, Card } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CodeSnippetsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [codeSnippets, setCodeSnippets] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newCodeContent, setNewCodeContent] = useState('')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsFound = await Api.Project.findManyByUserId(userId, {
          includes: ['codesnippets'],
        })
        setProjects(projectsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch projects', { variant: 'error' })
      }
    }

    fetchProjects()
  }, [userId])

  const handleSelectProject = async project => {
    setSelectedProject(project)
    setCodeSnippets(project.codesnippets || [])
  }

  const handleAddSnippet = async () => {
    if (!selectedProject) {
      enqueueSnackbar('Select a project first', { variant: 'info' })
      return
    }

    try {
      const newSnippet = await Api.Codesnippet.createOneByProjectId(
        selectedProject.id,
        { codeContent: newCodeContent },
      )
      setCodeSnippets([...codeSnippets, newSnippet])
      setNewCodeContent('')
      setIsModalVisible(false)
      enqueueSnackbar('Snippet added successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to add snippet', { variant: 'error' })
    }
  }

  const handleDeleteSnippet = async snippetId => {
    try {
      await Api.Codesnippet.deleteOne(snippetId)
      setCodeSnippets(codeSnippets.filter(snippet => snippet.id !== snippetId))
      enqueueSnackbar('Snippet deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete snippet', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Manage Code Snippets</Title>
      <Text>Select a project to view and manage its code snippets.</Text>
      <List
        dataSource={projects}
        renderItem={project => (
          <List.Item onClick={() => handleSelectProject(project)}>
            <Card title={project.name}>{project.description}</Card>
          </List.Item>
        )}
      />
      {selectedProject && (
        <>
          <Button
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add Snippet
          </Button>
          <List
            dataSource={codeSnippets}
            renderItem={snippet => (
              <List.Item
                actions={[
                  <EditOutlined key="edit" />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => handleDeleteSnippet(snippet.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={<Text code>{snippet.codeContent}</Text>}
                />
              </List.Item>
            )}
          />
        </>
      )}
      <Modal
        title="Add New Code Snippet"
        visible={isModalVisible}
        onOk={handleAddSnippet}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input.TextArea
          rows={4}
          value={newCodeContent}
          onChange={e => setNewCodeContent(e.target.value)}
        />
      </Modal>
    </PageLayout>
  )
}
