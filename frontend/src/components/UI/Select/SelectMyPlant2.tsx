//test
import { getAuthToken } from "@/apis/diary.api";
import { AddedTag, AddTagButton, Select, SelectRow, SelectWrapper, TagList, TagRemoveButton } from "@/components/UI/Select/SelectMyPlant.styles";
import { useEffect, useState } from "react";

export interface PlantNameRequest {
    cntntsNo: string; // id
    cntntsSj: string; // name
}


export interface PlantSelectorProps {
  onChange: (plants: PlantNameRequest[]) => void;
}

const PlantSelector2 = ({ onChange }: PlantSelectorProps) => {
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [selectedPlants, setSelectedPlants] = useState<PlantNameRequest[]>([]);
  const [plantList, setPlantList] = useState<PlantNameRequest[]>([]);

  const handleAddPlant = () => {
    const plant = plantList.find(p => p.cntntsNo === selectedPlantId);
    if (plant && !selectedPlants.some(p => p.cntntsNo === plant.cntntsNo)) {
      setSelectedPlants(prev => [...prev, plant]);
    }
  };

  const handleRemovePlant = (id: string) => {
    setSelectedPlants(prev => prev.filter(p => p.cntntsNo !== id));
  };

  useEffect(() => {
    onChange(selectedPlants);
  }, [selectedPlants, onChange]);

  useEffect(() => {
    const fetchMyPlant = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch("/plants", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("식물 정보를 불러오는데 실패했습니다");
        const data: PlantNameRequest[] = await response.json();
        setPlantList(data);

        if (data.length > 0) {
          setSelectedPlantId(data[0].cntntsNo);
        }
      } catch (error) {
        console.error("내 식물 불러오기 실패:", error);
      }
    };
    fetchMyPlant();
  }, []);

  return (
    <SelectWrapper>
      <SelectRow>
        <Select
          value={selectedPlantId ?? ""}
          onChange={e => setSelectedPlantId(e.target.value)}
        >
          {plantList.map(plant => (
            <option key={plant.cntntsNo} value={plant.cntntsNo}>
              {plant.cntntsSj}
            </option>
          ))}
        </Select>
        <AddTagButton onClick={handleAddPlant}>추가</AddTagButton>
      </SelectRow>

      <TagList>
        {selectedPlants.map(plant => (
          <AddedTag key={plant.cntntsNo}>
            {plant.cntntsSj}
            <TagRemoveButton onClick={() => handleRemovePlant(plant.cntntsNo)} />
          </AddedTag>
        ))}
      </TagList>
    </SelectWrapper>
  );
};

export default PlantSelector2;