import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {Row, Col, Label} from 'react-bootstrap';
import {EditorState, convertFromRaw} from 'draft-js';
import {loadPageArticles} from '../../actions/actions';

import '../CommentList.scss';
import RichEditor from './RichEditor';
import PaginationBlock from "./PaginationBlock";

class LatestArticlesList extends React.Component {

  constructor() {
    super();
    this.getPaginationBlock = this.getPaginationBlock.bind(this);
  }

  componentDidMount() {
    if (this.props.articles.length === 0) {
      this.props.dispatch(loadPageArticles(this.props.params.page));
    }
  }

  handleRefreshComments() {
    this.props.dispatch(loadPageArticles(0));
  }

  render() {
    return (
      <div className="comments">
        <h1>Свежие</h1>
        <button className="btn btn-default" onClick={() => this.handleRefreshComments()}>Refresh</button>
        { !this.props.articles || this.props.articles.length === 0
          ? <p> Пока ничего нет :( Стань первым ? </p>
          : this.props.articles.map((each, i) => LatestArticlesList.getArticlePreview(each, i)) }

        {this.getPaginationBlock()}
      </div>
    );
  }

  static getArticlePreview(each) {
    return (<div className="message" key={each.modifyDate + each.articleId}>
      <Row>
        <Col md={8} mdOffset={1}>
          <h1>{each.title}</h1>
        </Col>
        <Col md={1} mdOffset={1}>
          <h3><Label bsStyle="info">{each.createDate}</Label></h3>
        </Col>
      </Row>
      <hr/>
      <RichEditor
        key={`editor${each.modifyDate}${each.articleId}`}
        editorState={EditorState.createWithContent(convertFromRaw(each.content))}
        readOnly/>
      <Link
        to={`/article/${each.articleId}`}
        key={`${each.modifyDate}_LINK`}
        bsStyle="info"
        className="btn btn-info">Подробнее</Link>
    </div>);
  }

  getPaginationBlock() {
    return <PaginationBlock clickMore={() => this.props.dispatch(loadPageArticles(this.props.articles.length))}/>;
  }

}


LatestArticlesList.propTypes = {
  articles: React.PropTypes.array,
  params: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    articles: state.articles
  };
}

export default connect(mapStateToProps)(LatestArticlesList);