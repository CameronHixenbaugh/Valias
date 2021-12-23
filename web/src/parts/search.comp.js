import {useState} from "react";
import axios from "axios";
import { 
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    InputGroup
  } from "@chakra-ui/react";
  import {
    SearchIcon
  } from "@chakra-ui/icons"


export default function Search(){
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`query is: ${query}`);
    }

    return(
    <form onSubmit={handleSubmit}>
    <FormControl>
    <Center>
      <InputGroup size="md" w="50%">
        <FormLabel srOnly>Filter by name</FormLabel>
          <SearchIcon />
        <Input rounded="base" borderWidth="1px" borderRadius="lg" placeholder="Filter by name..." 
        name="query" value={query} onChange={(e)=>setQuery(e.currentTarget.value)} />
          <Button type="submit" style={{
              border: "2px solid #BEE3F8",
              boxSizing: "border-box",
              boxShadow: "inset 0px 4px 4px #E2E8F0",
              filter: "drop-shadow(0px 4px 4px #C4C4C4)",
              borderRadius: "6px",
              fontFamily: "Sora",
              fontStyle: "normal",
              fontWeight: "bolder",
              fontSize: "16px",
              lineHeight: "24px",
              color: "rgba(226, 232, 240, 0.92)",
              textShadow: "0px 4px 4px rgba(196, 196, 196, 0.0989583)",
              backgroundColor: "black"
            }}>
            Submit
          </Button>
      </InputGroup>
      </Center>
    </FormControl>
    </form>
    )
}
   