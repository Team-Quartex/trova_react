import React from 'react'
import SearchBar from '../components/SearchBar'
import Section from '../components/Section'

const FeedDayout = () => {
  return (
    <div className='h-full overflow-y-auto pb-8'>
      <SearchBar/>
      <Section title={"Suggetions"}></Section>
      <Section title={"Top Rated"}></Section>
      <Section title={"New Update"}></Section>
    </div>
  )
}

export default FeedDayout
