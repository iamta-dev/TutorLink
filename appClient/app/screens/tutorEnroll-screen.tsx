import * as React from "react"
import { useState } from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../models/root-store"
import { NavigationScreenProp } from "react-navigation"
import { Button, Container, Content, Form, Input, Item, Text, Textarea } from "native-base"
import { FlexStyle } from "react-native"

export interface TutorEnrollScreenProps {
  navigation: NavigationScreenProp<{}>
}

const FLEX_BOTTOM: FlexStyle = { marginBottom: 4 }
export const TutorEnrollScreen: React.FunctionComponent<TutorEnrollScreenProps> = observer((props) => {
  // Props
  const { navigation } = props
  // Store
  const { tutorJoinStore: { createTutorJoin } } = useStores()
  // State
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  //  Navigator
  const postId = navigation.getParam("postId")
  const goBack = React.useMemo(() => () => navigation.goBack(null), [props.navigation])
  // Function
  const formSubmit = () => {
    setErrorMessage("")
    createTutorJoin(postId, +price, description)
      .then(res => {
        goBack()
      })
      .catch(msg => {
        setErrorMessage(msg.message)
      })
  }
  return (
    <Container>
      <Content padder>
        <Form>
          <Text>ราคา 1 คอร์ส</Text>
          <Item regular style={FLEX_BOTTOM}>
            <Input keyboardType={'numeric'} onChangeText={text => setPrice(+text)} value={price.toString()} placeholder='ราคา 1 คอร์ส' />
          </Item>
          <Text>รายละเอียด</Text>
          <Textarea onChangeText={text => setDescription(text)} value={description} rowSpan={5} bordered placeholder="รายละเอียด" style={FLEX_BOTTOM} />
          <Text>{ errorMessage }</Text>
          <Button onPress={formSubmit}><Text>ยืนยัน</Text></Button>
        </Form>
      </Content>
    </Container>
  )
})
