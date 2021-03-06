// @flow
import React from 'react'
import './Circle.css'
import UserProfile from 'components/UserProfile'
import { message } from 'antd'
import { withRouter } from 'react-router'

type Props = {
  match: Object
}
type State = {
  postlist: Array<Object>,
  userinfo: Object
}

class Circle extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      postlist: [],
      userinfo: {}
    }
  }
  componentWillMount () {
    const username = this.props.match.params.username
    if (username === 'null') {
      message.info('请先登录')
      window.location.href = '/login'
    }
    fetch(`/info/get?username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      userinfo: res
    }))
    fetch(`/post/get?author=${username}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        postlist: res
      })
    })
  }

  render () {
    const { postlist, userinfo } = this.state
    return (
      <div>
        <UserProfile {...{ userinfo }} />
      </div>
    )
  }
}

export default withRouter(Circle)
