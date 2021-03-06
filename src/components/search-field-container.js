import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import AnimateHeight from 'react-animate-height';


class FederatedSearchFieldContainer extends React.Component {
  constructor(props) {
    super(props);

    // This will return the width of the viewport.
    const intFrameWidth = window.innerWidth;

    this.state = {
      // Filters are visible for large / hidden for small screens by default.
      expanded: intFrameWidth > 900,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { onNewSearch } = this.props;
    const height = this.state.expanded ? 'auto' : 0;

    return (
      <div className="search-filters">
        <button
          className={cx('search-filters__trigger', {
            'js-search-filters-open': this.state.expanded,
          })}
          onClick={this.handleClick}
        >
            Filter Results
        </button>
        <AnimateHeight
          duration={450}
          height={height}
        >
          <form className="search-filters__form">
            <section className="search-accordion" aria-labelledby="section-title">
              <div className="search-filters__row">
                <h2 className="search-filters__title" id="section-title">Filter Results</h2>
              </div>
              { this.props.resultsCount > 0
                ? (<ul className="search-accordion__group">{this.props.children}</ul>)
                : <div className="search-filters__no-results">There are no results to filter.</div> }
            </section>

            { this.props.resultsCount > 0
              ? <div className="search-filters__row"><button className="search-filters__reset" type="button" onClick={onNewSearch}>Clear All</button></div>
              : null }
          </form>
        </AnimateHeight>
      </div>
    );
  }
}

FederatedSearchFieldContainer.propTypes = {
  children: PropTypes.array,
  onNewSearch: PropTypes.func,
};

export default FederatedSearchFieldContainer;
