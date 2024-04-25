'use client'

import { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Card,
  Typography,
  Row,
  Col,
  Tooltip,
  Select,
  message,
  Modal,
  Spin,
} from 'antd';
import {
  UserOutlined,
  ProjectOutlined,
  CodeOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  SyncOutlined,
  EyeOutlined,
  FunnelPlotOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
const { Title, Text } = Typography;
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AIAssistantPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const authentication = useAuthentication();
  const userId = authentication.user?.id;
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState('');
  const [codingLevel, setCodingLevel] = useState('');
  const [verbosityLevel, setVerbosityLevel] = useState('Medium');
  const [currentTime, setCurrentTime] = useState('');
  const [funFact, setFunFact] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [formatStyle, setFormatStyle] = useState('Compact');
  const [codeTheme, setCodeTheme] = useState('light');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs().tz('America/Los_Angeles');
      setCurrentTime(now.format('h:mm:ss A'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchFunFact = async () => {
      try {
        const today = dayjs().format('MMMM D');
        const randomYear = Math.floor(Math.random() * (dayjs().year() - 1900 + 1)) + 1900;
        const fact = await Api.Ai.chat(`Tell me a more intriguing and complex fun fact about ${today} from the year ${randomYear}, involving historical or technical depth.`);
        setFunFact(fact);
      } catch (error) {
        enqueueSnackbar('Failed to fetch fun fact. Please try again later.', { variant: 'error' });
      }
    };
    fetchFunFact();
    const intervalId = setInterval(fetchFunFact, 86400000); // Refresh daily
    return () => clearInterval(intervalId);
  }, []);

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleQuerySubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const detailedPrompt = `${programmingLanguage}, Level: ${codingLevel}, Verbosity: ${verbosityLevel}: ${input}. Please provide code that is 5 times more advanced and detailed.`;
      const aiResponse = await Api.Ai.chat(detailedPrompt);
      setResponse(aiResponse);
      setShowPopup(true);
      enqueueSnackbar('Generated code prompt', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to get response due to complex code generation', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleDownloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([response], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = "AI_Generated_Code.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handlePreviewCode = () => {
    setPreviewModalVisible(true);
  };

  const formatExpanded = (code) => {
    switch (formatStyle) {
      case 'Indented':
        return code.split(';').map(line => `  ${line.trim()}`).join(';\n');
      case 'Compact':
        return code.replace(/\s+/g, ' ');
      case 'Detailed':
        return code.split(';').map(line => `// Processing: ${line.trim()}\n${line.trim()}`).join(';\n');
      case 'Super Ultra Detailed':
        return code.split(';').map(line => `// Detailed Explanation: ${line.trim()}\n// Step-by-step: ${line.trim()}\n${line.trim()}`).join(';\n');
      default:
        return code;
    }
  };

  const handleImproveCode = async () => {
    if (!response) return;
    setLoading(true);
    try {
      const improvedResponse = await Api.Ai.chat(`Improve this code with advanced AI capabilities, ensuring full computational power without optimization: ${response}`);
      setResponse(improvedResponse);
      enqueueSnackbar('Code improved successfully, maintaining full computational power.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to improve code due to advanced AI requirements.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout layout="narrow">
      <Title level={2}>AI Assistant</Title>
      <Text>
        Interact with an AI to receive code suggestions.
      </Text>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Select
            style={{ width: '100%' }}
            placeholder="Select Programming Language"
            onChange={setProgrammingLanguage}
            value={programmingLanguage}
          >
            <Select.Option value="Roblox Lua">Roblox Lua</Select.Option>
            <Select.Option value="Python">Python</Select.Option>
            <Select.Option value="JavaScript">JavaScript</Select.Option>
            <Select.Option value="HTML">HTML</Select.Option>
            <Select.Option value="CSS">CSS</Select.Option>
          </Select>
        </Col>
        <Col span={12}>
          <Select
            style={{ width: '100%' }}
            placeholder="Select Coding Level"
            onChange={setCodingLevel}
            value={codingLevel}
          >
            <Select.Option value="Beginner">Beginner</Select.Option>
            <Select.Option value="Advanced">Advanced</Select.Option>
            <Select.Option value="Super Advanced">Super Advanced</Select.Option>
            <Select.Option value="Super Ultra Advanced">Super Ultra Advanced</Select.Option>
            <Select.Option value="Super IQ Ultra Advanced">Super IQ Ultra Advanced</Select.Option>
            <Select.Option value="Albert Einstein Super IQ Ultra Advanced">Albert Einstein Super IQ Ultra Advanced</Select.Option>
          </Select>
        </Col>
        <Col span={24}>
          <Select
            style={{ width: '100%' }}
            placeholder="Select Verbosity Level"
            onChange={setVerbosityLevel}
            value={verbosityLevel}
          >
            <Select.Option value="Low">Low</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="High">High</Select.Option>
            <Select.Option value="Super Ultra Detailed">Super Ultra Detailed</Select.Option>
          </Select>
        </Col>
        <Col span={24}>
          <Input.Search
            enterButton="Ask AI"
            placeholder="Type your query here..."
            value={input}
            onChange={handleInputChange}
            onSearch={handleQuerySubmit}
            loading={loading}
          />
        </Col>
        <Col span={24}>
          <Select
            style={{ width: '100%' }}
            placeholder="Select Code Format"
            onChange={setFormatStyle}
            value={formatStyle}
          >
            <Select.Option value="Compact">Compact</Select.Option>
            <Select.Option value="Indented">Indented</Select.Option>
            <Select.Option value="Detailed">Detailed</Select.Option>
            <Select.Option value="Super Ultra Detailed">Super Ultra Detailed</Select.Option>
          </Select>
        </Col>
        <Col span={24}>
          <Select
            style={{ width: '100%' }}
            placeholder="Select Code Theme"
            onChange={setCodeTheme}
            value={codeTheme}
          >
            <Select.Option value="light">Light</Select.Option>
            <Select.Option value="dark">Dark</Select.Option>
          </Select>
        </Col>
        <Col span={24}>
          <Tooltip title="Preview the formatted code">
            <Button type="default" onClick={handlePreviewCode} icon={<EyeOutlined />} style={{ marginRight: '10px' }} disabled={!response}>
              Preview Code
            </Button>
          </Tooltip>
          <Tooltip title="Download the generated code">
            <Button type="default" onClick={handleDownloadCode} icon={<DownloadOutlined />} style={{ marginRight: '10px' }} disabled={!response}>
              Download Code
            </Button>
          </Tooltip>
          <Tooltip title="Improve the generated code without optimizing it, maintaining full computational power.">
            <Button type="default" onClick={handleImproveCode} icon={<SyncOutlined />} disabled={!response}>
              Improve Code
            </Button>
          </Tooltip>
          <Tooltip title="Fetch a fun fact">
            <Button type="default" onClick={() => Api.Ai.chat("Tell me a fun fact").then(setFunFact).catch(() => enqueueSnackbar('Failed to fetch fun fact', { variant: 'error' }))} icon={<FunnelPlotOutlined />} style={{ marginRight: '10px' }}>
              Fetch Fun Fact
            </Button>
          </Tooltip>
        </Col>
        <Col span={24}>
          <Card title="Current Time in Stockton, CA" extra={<ClockCircleOutlined />} style={{ marginTop: '20px' }}>
            <Text>{currentTime}</Text>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Fun Fact of the Day" extra={<InfoCircleOutlined />} style={{ marginTop: '20px' }}>
            <Text>{funFact}</Text>
          </Card>
        </Col>
      </Row>
      <Modal
        title="Generated Code"
        visible={showPopup}
        onOk={togglePopup}
        onCancel={togglePopup}
        footer={[
          <Button key="back" onClick={togglePopup}>
            Close
          </Button>
        ]}
      >
        <Text code style={{ whiteSpace: 'pre-wrap', background: codeTheme === 'dark' ? '#333' : '#fff', color: codeTheme === 'dark' ? '#fff' : '#000' }}>{response}</Text>
      </Modal>
      <Modal
        title="Preview Formatted Code"
        visible={previewModalVisible}
        onOk={() => setPreviewModalVisible(false)}
        onCancel={() => setPreviewModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setPreviewModalVisible(false)}>
            Close
          </Button>
        ]}
      >
        <Text code style={{ whiteSpace: 'pre-wrap', background: codeTheme === 'dark' ? '#333' : '#fff', color: codeTheme === 'dark' ? '#fff' : '#000' }}>{formatExpanded(response)}</Text>
      </Modal>
    </PageLayout>
  );
}