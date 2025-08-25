import { Button, TextField, Card, CardContent } from '@mui/material'
import './App.css'

function App() {

  return (
    <>
      <div className="p-8 space-y-6">
      {/* Botão MUI normal */}
      <Button variant="contained" color="primary">
        Botão MUI Normal
      </Button>
      
      {/* Botão MUI com Tailwind customizado */}
      <Button 
        variant="contained" 
        className="bg-red-500 hover:bg-red-600 ml-4"
      >
        Botão MUI + Tailwind
      </Button>
      
      {/* Card MUI com Tailwind */}
      <Card className="max-w-md shadow-lg">
        <CardContent className="bg-gradient-to-r from-purple-400 to-pink-400">
          <h3 className="text-white font-bold text-lg">
            MUI Card + Tailwind Gradient
          </h3>
        </CardContent>
      </Card>
      
      {/* Input MUI com Tailwind */}
      <TextField 
        label="Email"
        variant="outlined"
        className="w-full max-w-sm"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px', // MUI styling
          }
        }}
      />
    </div>
    </>
  )
}

export default App
