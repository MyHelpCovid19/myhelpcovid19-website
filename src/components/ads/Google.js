import React from 'react';
import PropTypes from 'prop-types';

class Google extends React.Component {
  componentDidMount() {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className={`${this.props.className} adsbygoogle`}
        style={this.props.style}
        data-ad-client={this.props.client}
        data-ad-slot={this.props.slot}
        data-ad-layout={this.props.layout}
        data-ad-format={this.props.format}
        data-full-width-responsive={this.props.responsive}
      />
    );
  }
}

Google.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line
  client: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired,
  layout: PropTypes.string,
  format: PropTypes.string,
  responsive: PropTypes.string,
};

Google.defaultProps = {
  className: '',
  style: { display: 'block' },
  format: 'auto',
  layout: '',
  responsive: 'false',
};

export default Google;
