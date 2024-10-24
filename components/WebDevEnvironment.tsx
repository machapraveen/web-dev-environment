'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dynamic from 'next/dynamic'

const ForceGraph2D = dynamic(() => import('react-force-graph').then(mod => mod.ForceGraph2D), { ssr: false })

const initialGraphData = {
  nodes: [
    { id: 'Web development', group: 0 },
    { id: 'Front End Developer', group: 1 },
    { id: 'Back End', group: 2 },
    { id: 'Basic Front End', group: 3 },
    { id: 'Front End Frameworks', group: 3 },
    { id: 'Testing', group: 3 },
    { id: 'Backend Technologies', group: 4 },
    { id: 'Data Base', group: 4 },
    { id: 'HTML', group: 5 },
    { id: 'CSS', group: 5 },
    { id: 'JavaScript', group: 5 },
    { id: 'Bootstrap', group: 6 },
    { id: 'Angular', group: 6 },
    { id: 'React', group: 6 },
    { id: 'Ember.js', group: 6 },
    { id: 'Vue.js', group: 6 },
    { id: 'Backbone.js', group: 6 },
    { id: 'Jasmine', group: 7 },
    { id: 'Karma', group: 7 },
    { id: 'Node.js/ Express.js', group: 8 },
    { id: 'Python (Django)', group: 8 },
    { id: 'Java', group: 8 },
    { id: 'PHP', group: 8 },
    { id: 'MySQL', group: 9 },
    { id: 'MongoDB', group: 9 },
    { id: 'Cassandra', group: 9 },
    { id: 'Apache', group: 9 },
    { id: 'Nginx', group: 9 },
  ],
  links: [
    { source: 'Web development', target: 'Front End Developer' },
    { source: 'Web development', target: 'Back End' },
    { source: 'Front End Developer', target: 'Basic Front End' },
    { source: 'Front End Developer', target: 'Front End Frameworks' },
    { source: 'Front End Developer', target: 'Testing' },
    { source: 'Back End', target: 'Backend Technologies' },
    { source: 'Back End', target: 'Data Base' },
    { source: 'Basic Front End', target: 'HTML' },
    { source: 'Basic Front End', target: 'CSS' },
    { source: 'Basic Front End', target: 'JavaScript' },
    { source: 'Front End Frameworks', target: 'Bootstrap' },
    { source: 'Front End Frameworks', target: 'Angular' },
    { source: 'Front End Frameworks', target: 'React' },
    { source: 'Front End Frameworks', target: 'Ember.js' },
    { source: 'Front End Frameworks', target: 'Vue.js' },
    { source: 'Front End Frameworks', target: 'Backbone.js' },
    { source: 'Testing', target: 'Jasmine' },
    { source: 'Testing', target: 'Karma' },
    { source: 'Backend Technologies', target: 'Node.js/ Express.js' },
    { source: 'Backend Technologies', target: 'Python (Django)' },
    { source: 'Backend Technologies', target: 'Java' },
    { source: 'Backend Technologies', target: 'PHP' },
    { source: 'Data Base', target: 'MySQL' },
    { source: 'Data Base', target: 'MongoDB' },
    { source: 'Data Base', target: 'Cassandra' },
    { source: 'Data Base', target: 'Apache' },
    { source: 'Data Base', target: 'Nginx' },
  ]
}

export default function WebDevLearningPlatform() {
  const [attendance, setAttendance] = useState(false)
  const [homework, setHomework] = useState('')
  const [nextMeeting, setNextMeeting] = useState('')
  const [graphData, setGraphData] = useState(initialGraphData)

  useEffect(() => {
    // Set next meeting time to 21:40 today
    const today = new Date()
    today.setHours(21, 40, 0, 0)
    setNextMeeting(today.toISOString())
  }, [])

  const markAttendance = () => {
    setAttendance(true)
    notifyAdmins('Attendance marked for today')
  }

  const submitHomework = () => {
    if (homework.trim()) {
      notifyAdmins(`Homework submitted: ${homework}`)
      setHomework('')
    } else {
      toast.error('Please enter your homework before submitting')
    }
  }

  const notifyAdmins = (message) => {
    // In a real application, you would send notifications to both admins
    // For this example, we'll just show a toast notification
    toast.success(`Admin Notification: ${message}`)
  }

  const handleNodeClick = useCallback(node => {
    if (node.collapsed) {
      node.collapsed = false;
      setGraphData(prevData => ({
        nodes: prevData.nodes,
        links: [
          ...prevData.links,
          ...prevData.nodes
            .filter(n => n.group === node.group + 1)
            .map(n => ({ source: node.id, target: n.id }))
        ]
      }));
    } else {
      node.collapsed = true;
      setGraphData(prevData => ({
        nodes: prevData.nodes,
        links: prevData.links.filter(l => l.source !== node.id || l.target === node.id)
      }));
    }
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Full Stack Web Development Learning Platform</h1>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="databases">Databases</TabsTrigger>
          <TabsTrigger value="career">Career</TabsTrigger>
          <TabsTrigger value="diagram">Diagram</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Full Stack Web Development Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Full stack web development encompasses both frontend and backend technologies, allowing developers to create complete web applications. It includes knowledge of frontend languages, backend languages, frameworks, and database management systems.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frontend">
          <Card>
            <CardHeader>
              <CardTitle>Frontend Development</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold">Frontend Languages</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>HTML (HyperText Markup Language): The skeleton of web pages, used for structuring content.</li>
                <li>CSS (Cascading Style Sheets): Provides design and layout to web pages, simplifying the presentation.</li>
                <li>JavaScript: Enables interactive and dynamic web pages, providing user interaction.</li>
              </ul>

              <h3 className="text-lg font-semibold">Frontend Frameworks</h3>
              <ul className="list-disc pl-5">
                <li>React: Simple to learn, ideal for building user interfaces, and widely used in the industry.</li>
                <li>Angular: Based on TypeScript, offers two-way data binding, and is great for large-scale applications.</li>
                <li>Vue.js: Flexible and popular for various design structures, with a gentle learning curve.</li>
                <li>Bootstrap: A CSS framework for developing responsive and mobile-first websites.</li>
                <li>Ember.js: A framework for creating ambitious web applications.</li>
                <li>Backbone.js: Gives structure to web applications by providing models, views, collections, and events.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Testing</h3>
              <ul className="list-disc pl-5">
                <li>Jasmine: A behavior-driven development framework for testing JavaScript code.</li>
                <li>Karma: A test runner that allows you to execute JavaScript code in multiple real browsers.</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backend">
          <Card>
            <CardHeader>
              <CardTitle>Backend Development</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold">Backend Languages</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>C#: Stable and versatile, related frameworks make it an important choice for web and software development.</li>
                <li>GoLang: Static language with simple syntax, great for creating stable and effective server-side functions.</li>
                <li>Java: Versatile and used for various digital platforms, including mobile devices.</li>
                <li>JavaScript (Node.js): Easy to learn with simple syntax, allows for client-side validation.</li>
                <li>PHP: Suitable for server-side functionality, with easy deployment tools and capabilities.</li>
                <li>Python: Straightforward with simple syntax, supports several web development frameworks like Django and Flask.</li>
                <li>SQL: Structured Query Language for server-side information from databases.</li>
              </ul>

              <h3 className="text-lg font-semibold">Backend Frameworks</h3>
              <ul className="list-disc pl-5">
                <li>Django (Python): Ideal for database-driven applications, with a robust ORM.</li>
                <li>Express.js (Node.js): Perfect for JavaScript developers, used in popular applications like MySpace and Uber.</li>
                <li>Flask (Python): Allows for very customized projects, runs on a web server rather than a users browser.</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="databases">
          <Card>
            <CardHeader>
              <CardTitle>Database Management Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Oracle: Effective object-relational DBMS for data warehousing and online transactions. Easy to recover data and deploy on public or private clouds.</li>
                <li>MySQL: Open-source, reliable, and cost-effective RDBMS. High-speed data processing and easy integration with Apache.</li>
                <li>Microsoft SQL Server: Efficient RDBMS for multi-user environments. Highly secure and consistent.</li>
                <li>MongoDB: Cross-platform, open-source NoSQL database management system. Ideal for high-volume data storage and supports various programming languages.</li>
                <li>Cassandra: A highly scalable, distributed NoSQL database designed to handle large amounts of structured data across multiple commodity servers.</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="career">
          <Card>
            <CardHeader>
              <CardTitle>Career in Full Stack Development</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold">Skills Required</h3>
              <p className="mb-4">Mastery in multiple frontend and backend languages, versatility in handling various technologies. The more languages and experience a person has, the more in-demand they become.</p>

              <h3 className="text-lg font-semibold">Responsibilities</h3>
              <p className="mb-4">Developing functional databases, creating end-to-end web architecture, enhancing user experience, upgrading software, and staying updated with technical and consumer needs.</p>

              <h3 className="text-lg font-semibold">Opportunities</h3>
              <p className="mb-4">Wide range of opportunities due to familiarity with multiple technologies and stacks like MERN (MongoDB, Express.js, React, Node.js) and MEAN (MongoDB, Express.js, Angular, Node.js).</p>

              <h3 className="text-lg font-semibold">Global Market Demand</h3>
              <p>High demand in the technology-driven world, especially with the growth of social media platforms. The tech sector is projected to generate up to 65 million jobs by 2025.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagram">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Web Development Diagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ height: '600px' }}>
                <ForceGraph2D
                  graphData={graphData}
                  nodeLabel="id"
                  nodeAutoColorBy="group"
                  onNodeClick={handleNodeClick}
                  linkDirectionalParticles={2}
                  linkDirectionalParticleSpeed={0.005}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Daily Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox id="attendance" checked={attendance} onCheckedChange={markAttendance} />
            <Label htmlFor="attendance">Mark Attendance</Label>
          </div>

          <div className="mb-4">
            <Label htmlFor="homework">Submit Homework</Label>
            <div className="flex mt-1">
              <Input
                id="homework"
                value={homework}
                onChange={(e) => setHomework(e.target.value)}
                placeholder="Enter your homework"
                className="mr-2"
              />
              <Button onClick={submitHomework}>Submit</Button>
            </div>
          
          </div>

          <div>
            <Label>Next Google Meet</Label>
            <p className="mt-1">{new Date(nextMeeting).toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      <ToastContainer position="bottom-right" />
    </div>
  )
}