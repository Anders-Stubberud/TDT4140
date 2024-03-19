import React, { useEffect, useState } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { serverEndpoint, flashcardSet, tagsAvailable, idToLikeStore } from "@/state/zustand";
import { changeChosenSet } from "@/state/zustand";
import SortIcon from "@/icons/sortIcon";
import {Checkbox} from "@nextui-org/react";
import { editForAll } from "@/state/zustand";

export default function SearchBar({ setData, setNum, setIsLoading, data }: any ) {
  const [searchTerm, setSearchTerm] = useState("");
  const [first, setFirst] = useState(true);
  const { sett, setSett } = changeChosenSet();
  const { tags, setTags } = tagsAvailable();
  const { idToLikeMapper, updateIdToLikeMapper } = idToLikeStore();
  const { editableSets, setEditableSets } = editForAll();

  function isSubset(subset: string [], superset: string []) {
    return subset.every(item => superset.includes(item));
  }  

  const handleSearch = async () => {
    const endpoint = serverEndpoint + '/api/getFlashcards';
    if (first) {
      setFirst(false);
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const receivedData = await response.json();
        console.log(receivedData);
        receivedData.forEach((element: any) => {
          updateIdToLikeMapper(element.flashcardSetID, element.numberOfLikes )
        });
        console.log(receivedData);
        const editable = receivedData.filter((item: any) => item.public_edit == 'true').map((item: any) => item.flashcardSetID);
        setEditableSets(editable);
        const relevantData = receivedData.filter((item: any) => item.public_use == 'true' || item.creatorID == localStorage.getItem('userID'))
        setData(relevantData);
        setSett(relevantData);
        setNum(Math.ceil(relevantData.length / 3))
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      let filteredData: any[] = sett.filter((value: any) =>
      value.setTitle.toLowerCase().startsWith(searchTerm.toLowerCase()) && 
      isSubset(selectedItems.filter(str => str !== ''), value.tags)
      );
      if (isSelected) {
        const response = await fetch(`${serverEndpoint}/api/getFavourites/${localStorage.getItem('userID')}`);
        const result = await response.json();
        const favSets = result.filter((val: any) => val != null && val != undefined).map((set: any) => set.flashcardSetID);
        filteredData = filteredData.filter((set) => favSets.includes(set.flashcardSetID));
      }
      if (selectedItemsSort.length == 0) {
        setData(filteredData);
        setNum(Math.ceil(filteredData.length / 3))
        setIsLoading(false);
      }
      else if (selectedItemsSort[0] == 'Alphabetically') {
          const sortedData = [...filteredData].sort((a, b) =>
          a.setTitle.localeCompare(b.setTitle)
        );
        setData(sortedData);
        setNum(Math.ceil(sortedData.length / 3));
        setIsLoading(false);
      }
      else if (selectedItemsSort[0] == 'Most popular') {
        const sortedData = [...filteredData].sort((a, b) => {
          console.log("Comparing:", a.numberOfLikes, b.numberOfLikes);
          const result = b.numberOfLikes - a.numberOfLikes;
          console.log("Result:", result);
          return result;
        });
        console.log("Sorted Data:", sortedData);
        setData(sortedData);
        setNum(Math.ceil(sortedData.length / 3));
        setIsLoading(false);
      }
    }
  };

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [isSelected])

  const [selectedItems, setSelectedItems] = useState<string []>([]); //tags

  const handleSelectionChange = (event: any) => {
    const selectedItems = event.target.value;
    const arr = selectedItems.split(",");
    setSelectedItems(arr);
  };   

  const [selectedItemsSort, setSelectedItemsSort] = useState<string []>([]); //gives array with 1 item

  const handleSelectionChangeSort = (event: any) => {
    const selectedItems = event.target.value;
    const arr = selectedItems.split(",");
    setSelectedItemsSort(arr);
  };  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const taggiesRAW = await fetch(`${serverEndpoint}/api/getTags`);
        const taggies = await taggiesRAW.json();
        const tagsArr = taggies.tagsArr;
        setTags(tagsArr);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
  
    fetchData(); // Call the async function immediately
  }, []);
  

  useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedItems, selectedItemsSort]); 

  return (
    <div className="flex justify-between px-14">

      <div>
        <Input
          placeholder="Search for set"
          variant="bordered"
          className="w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Checkbox className="mt-1" isSelected={isSelected} onValueChange={setIsSelected}>
          My favourite lists
        </Checkbox>
      </div>

      <Select
        label="Tags"
        placeholder="Select tags"
        selectionMode="multiple"
        className="w-80"
        variant="bordered"
        selectedKeys={selectedItems}
        onChange={handleSelectionChange}
              >
        {tags.map((item) => (
          <SelectItem key={item} value={item}>{item}</SelectItem>
        ))}
      </Select>

      <Select
        label="Sort"
        placeholder="Select sort key"
        className="w-80"
        variant="bordered"
        selectedKeys={selectedItemsSort}
        onChange={handleSelectionChangeSort}
        startContent={<SortIcon />}
              >
        {[
          { value: 'Most popular', label: 'Most popular' },
          { value: 'Alphabetically', label: 'Alphabetically' },
        ].map((item) => (
          <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
        ))}
      </Select>

    </div>
  );
}