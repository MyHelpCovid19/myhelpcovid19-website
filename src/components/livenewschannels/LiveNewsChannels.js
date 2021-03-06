import React, { Component, lazy, Suspense } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import * as FirestoreService from '../../services/firebase';

import map from 'lodash/map';

const LiveNewsChannelsMasonry = lazy(() => import('./LiveNewsChannelsMasonry'));

class LiveNewsChannels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liveChannels: [],
      loading: false,
      error: '',
      allLanguages: [],
      currData: '',
      selectedValue: 'english',
    };
  }

  async componentDidMount() {
    try {
      const doc = await FirestoreService.getLiveNewsChannels();

      let channelsLinks = [];
      Object.entries(doc.data()).forEach(([key, value]) => {
        channelsLinks = [...channelsLinks, { name: key, data: value }];
      });

      let languages = [];
      map(channelsLinks, (channels, idx) => {
        let data = {
          label: channels.name,
          value: channels.name,
        };
        languages = [...languages, data];
      });

      const currentDataIndex = channelsLinks.findIndex(
        (data) => data.name === 'english'
      );

      this.setState({
        liveChannels: channelsLinks,
        loading: false,
        allLanguages: languages,
        currData: channelsLinks[currentDataIndex],
      });
    } catch (err) {
      this.setState((error) => (error = err));
    }
  }

  // handle onChange event of the dropdown
  handleChange = (e) => {
    const currentDataIndex = this.state.liveChannels.findIndex(
      (data) => data.name === e.value
    );

    this.setState({
      selectedValue: e.value,
      currData: this.state.liveChannels[currentDataIndex],
    });
  };

  render() {
    const animatedComponents = makeAnimated();

    return (
      <div>
        <div className="mb-2">
          <small>Select News Language Below:</small>
        </div>
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          defaultValue={this.state.selectedValue}
          // value={selectedValue}
          value={this.state.allLanguages.filter(
            (obj) => obj.value === this.state.selectedValue
          )}
          onChange={this.handleChange}
          options={this.state.allLanguages}
        />

        {this.state.currData !== '' ? (
          <Suspense fallback={<div>Loading...</div>}>
            <LiveNewsChannelsMasonry data={this.state.currData} />
          </Suspense>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default LiveNewsChannels;
