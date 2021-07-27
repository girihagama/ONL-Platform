// New customer seacrh module
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

const initialState = {
    isLoading: false,
    results: [],
    value: ''
}

class SearchCustomer extends Component {
    state = {
        ...initialState,
        source: []
    }

    resultProcessor(resultSet) {
        var processed = [];
        resultSet.map((item) => {
            var row = {
                title : item.customerName,
                description : "Added On: " + item.createdDate,
                //price : item.id,
                data : item
            }
            // processed = processed.slice(5); //limit number of results
            processed.push(row);
        });
        return processed;
    }

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.customerName });
        console.log('Selected', result);
    };

    handleSearchChanage = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)
            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.customerName)

            this.setState({
                isLoading: false,
                results: _.filter(this.state.source, isMatch),
            })
        }, 300);
    }

    render() {
        console.log("Search", this.props, this.state);
        if (this.state.source = [] && (this.props.firestore.ordered.searchList)) {
            this.state.source = this.props.firestore.ordered.searchList;
            console.log('Results Loaded');
        }
        let { isLoading, value, results } = this.state;

        return (
            <div>
                <Search
                    input={{ icon: 'search', iconPosition: 'left' }}
                    loading={isLoading}
                    placeholder="Search Customer"
                    results={this.resultProcessor(results)}
                    value={value}
                    type='text'
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChanage, 500, {
                        leading: true,
                    })}
                />
            </div>
        );
    }
}

const mstp = (state) => {
    return state;
}

export default compose(
    firestoreConnect((props) => [
        { collection: 'customers', storeAs: 'searchList', orderBy: ['customerName', 'asc'] }
    ]),
    connect(mstp, null),
)(SearchCustomer);