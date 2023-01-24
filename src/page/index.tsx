import React, { useEffect, useState } from 'react'
import Chart, { ChartIndex } from './Chart'
import checkGameIsOver from './functions/checkGameIsOver'
import choiceTheNextMove from './functions/choiceTheNextMove'

interface PageProps {
  length: number
}

const Page: React.FC<PageProps> = ({ length }) => {
  const [chartValue, setchartValue] = useState<ChartIndex[]>([])
  const [isGameOver, setisGameOver] = useState<boolean>(false)
  const [turn, setturn] = useState<ChartIndex>(ChartIndex.X)

  useEffect(() => {
    setchartValue(Array(length * length).fill(ChartIndex.EMPTY))
  }, [])

  useEffect(() => {
    if (checkGameIsOver(chartValue, length)) {
      setisGameOver(true)
      console.log('Game is over')
    }
  }, [chartValue])

  return (
    <div>
      <div>
        <h1>Turn: {turn === ChartIndex.X ? 'X' : 'O'}</h1>
      </div>
      {isGameOver && <h2>Game is over</h2>}
      <Chart
        data={chartValue}
        length={length}
        changeData={(i, j, value) => {
          if (isGameOver) return

          chartValue[i * length + j] = value
          setchartValue([...chartValue])
        }}
        turn={turn}
        setturn={setturn}
      />
      <button
        style={{ marginTop: 20 }}
        onClick={() => {
          const answer = choiceTheNextMove(chartValue, 3, turn)

          if (answer) {
            setTimeout(() => {
              chartValue[Number(answer)] = turn
              setchartValue([...chartValue])
              setturn(turn === ChartIndex.X ? ChartIndex.O : ChartIndex.X)
            }, 1)
          }
        }}>
        Move
      </button>
    </div>
  )
}
export default Page
