import * as React from "react"
// import { useStores } from "../models/root-store"
import { NavigationScreenProp } from "react-navigation"
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Input,
  Textarea, Row,
} from "native-base"
import { useStores } from "../../../models/root-store"
import { useState } from "react"

export interface CreatePostScreenProps extends NavigationScreenProp<{}> {
}

export const CreatePostScreen: React.FunctionComponent<CreatePostScreenProps> = props => {
  const { studentPostStore: { createStudentPost } } = useStores()
  const [topic, setTopic] = useState("")
  const [description, setDescription] = useState("")
  // const [tagSubject, setTagSubject] = useState([])
  // const [tagDepartment, setTagDepartment] = useState([])
  return (
    <Container>
      <Content>
        <Form style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <Item regular style={{ margin: 7, marginRight: 0 }}>
            <Input
              placeholder="กรอกหัวเรื่อง (สิ่งที่ต้องการเรียน)"
              style={{ fontSize: 16, paddingLeft: 15 }}
              onChangeText={m => setTopic(m)}
            />
          </Item>
          <Item regular style={{ margin: 7, marginRight: 0 }}>
            <Input
              placeholder="แท็คชื่อวิชา สกิล หรือรหัสวิชา"
              style={{ fontSize: 16, paddingLeft: 15 }}
            />
          </Item>
          <Item regular style={{ margin: 7, marginRight: 0 }}>
            <Input
              placeholder="แท็คสาขาวิชา (ไม่บังคับ)"
              style={{ fontSize: 16, paddingLeft: 15 }}
            />
          </Item>
          <Textarea
            rowSpan={5}
            bordered
            placeholder="กรอกรายละเอียดเพิ่มเติม เช่น วันเวลา สถานที่"
            onChangeText={m => setDescription(m)}
            style={{
              fontSize: 16,
              paddingLeft: 15,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 6,
            }}
          />
          <Row style={{ marginTop: 40, alignSelf: 'center' }}>
            <Button primary onPress={() => createStudentPost(topic, description)}>
              <Text>สร้างโพส</Text>
            </Button>
            <Button danger style={{ marginLeft: 10 }}>
              <Text>ล้างฟอร์ม</Text>
            </Button>
          </Row>
        </Form>
      </Content>
    </Container>
  )
}
