#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'

const datasetPath = path.resolve(process.cwd(), 'public/data/merged-dataset.json')

function compareByStartDate(a, b) {
  const dateA = dayjs(a.startDate)
  const dateB = dayjs(b.startDate)

  return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0
}

function sortEntitiesRecursively(entities) {
  entities.sort(compareByStartDate)

  for (const entity of entities) {
    if (entity.children && Array.isArray(entity.children) && entity.children.length > 0) {
      sortEntitiesRecursively(entity.children)
    }
  }

  return entities
}

async function main() {
  try {
    const data = JSON.parse(fs.readFileSync(datasetPath, 'utf8'))
    const sortedData = sortEntitiesRecursively(data)
    fs.writeFileSync(datasetPath, JSON.stringify(sortedData, null, 2))
    console.log('Dataset successfully sorted by startDate!')
  } catch (error) {
    console.error('Error sorting dataset:', error)
    process.exit(1)
  }
}

main()
