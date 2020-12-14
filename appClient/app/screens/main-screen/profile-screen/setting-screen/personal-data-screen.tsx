import React from "react"
import { observer } from "mobx-react-lite"
import { StatusBar, Platform, ScrollView } from "react-native"
// import { useStores } from "../models/root-store"
import { NavigationScreenProp } from "react-navigation"
import {
  Header,
  Text,
  View,
  Button,
  Icon,
  Item,
  Input,
  Form,
  Row,
  Container
} from 'native-base';

export interface PersonalDataScreenProps {
  navigation: NavigationScreenProp<{}>
}

export const PersonalDataScreen: React.FunctionComponent<PersonalDataScreenProps> = observer((props) => {

  const { navigation } = props
  const goBack = React.useMemo(() => () => navigation.goBack(null), [props.navigation])

  return (
    <>
      <Container style={{ backgroundColor: '#fcfcfc' }}>
        {/* light-content ,dark-content*/}
        <StatusBar backgroundColor="#29B6F6" barStyle="light-content" />
        <HeadBer theme="#29B6F6" title='ตั้งค่าข้อมูลหน้าโปรไฟล์' goBackPage={() => goBack()} />

        <ScrollView>
          <View>
            <Form style={{ marginHorizontal: 20, marginVertical: 10 }}>
              <Item regular style={{ margin: 7, marginRight: 0 }}>
                <Input
                  placeholder="กรอกชื่อ"
                  style={{ fontSize: 16, paddingLeft: 15 }}
                />
              </Item>
              <Item regular style={{ margin: 7, marginRight: 0 }}>
                <Input
                  placeholder="กรอกนามสกุล"
                  style={{ fontSize: 16, paddingLeft: 15 }}
                />
              </Item>
              <Item regular style={{ margin: 7, marginRight: 0 }}>
                <Input
                  placeholder="กรอกชื่อผู้ใช้"
                  style={{ fontSize: 16, paddingLeft: 15 }}
                />
              </Item>
              <Item regular style={{ margin: 7, marginRight: 0 }}>
                <Input
                  placeholder="กรอกอีเมล"
                  style={{ fontSize: 16, paddingLeft: 15 }}
                />
              </Item>
              <Item regular style={{ margin: 7, marginRight: 0 }}>
                <Input
                  placeholder="กรอกเบอร์โทรศัพท์"
                  style={{ fontSize: 16, paddingLeft: 15 }}
                />
              </Item>

              <Row style={{ marginTop: 30, alignSelf: 'center' }}>
                <Button primary >
                  <Text>บันทึก</Text>
                </Button>
                <Button onPress={() => goBack()} danger style={{ marginLeft: 10 }}>
                  <Text>ยกเลิก</Text>
                </Button>
              </Row>
            </Form>

          </View>
        </ScrollView>

      </Container>
    </>
  )
})


export interface HeadBerProps {
  theme?: string,
  title?: string,
  goBackPage?: () => void
}

const HeadBer: React.FunctionComponent<HeadBerProps> = props => {
  return (
    <Header
      style={{
        height: 80,
        backgroundColor: props.theme,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

      <View style={{ width: 70 }}>
        <Button
          onPress={props.goBackPage}
          vertical
          bordered
          style={{ borderColor: '#29B6F6', backgroundColor: '#29B6F6' }}>
          <Icon type="AntDesign" name="arrowleft" style={{ color: 'white', fontSize: Platform.OS === 'ios' ? 30 : 38, }} />
        </Button>
      </View>

      <View>
        <Text
          style={{
            fontSize: Platform.OS === 'ios' ? 25 : 25,
            color: 'white',
            fontWeight: 'bold',
          }}>
          {props.title}
        </Text>
      </View>
      <View style={{ width: 70 }}>
      </View>
    </Header>
  )
}
