import {
  AddedTag,
  AddTagButton,
  Select,
  SelectRow,
  SelectWrapper,
  TagList,
  TagRemoveButton,
} from "@/components/UI/Select/SelectMyPlant.styles";
import { useMyPlants } from "@/hooks/useMyPlants";
import { useEffect, useMemo, useState } from "react";

export interface PlantNameRequest {
  cntntsNo: string; // id
  cntntsSj: string; // name
}

export interface PlantSelectorProps {
  onChange: (plants: PlantNameRequest[]) => void;
}

const PlantSelector2 = ({ onChange }: PlantSelectorProps) => {
  // 선택한 식물 id
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [selectedPlants, setSelectedPlants] = useState<PlantNameRequest[]>([]);
  const { myPlants, isLoading, error } = useMyPlants();

  // 들어오는 myPlants 값 체크
  useEffect(() => {
    console.log('myPlants:', myPlants);
  }, [myPlants]);


  // myPlants에서 plantList 변환
  const plantList = useMemo( // 
    () =>
      myPlants
        ? myPlants.map((p) => ({
            cntntsNo: String(p.id),
            cntntsSj: p.cntntsSj || '[이름없는식물]' //cntntsSj: p.name ?? '',
          }))
        : [],
    [myPlants]
  );

  // 최초 렌더 시 첫번째 식물이 선택되도록
  useEffect(() => {
    if (plantList.length > 0) {
      setSelectedPlantId(plantList[0].cntntsNo);
    }
  }, [plantList]);

  // 선택된 식물이 바뀔 때 onChange
  useEffect(() => {
    onChange(selectedPlants);
  }, [selectedPlants, onChange]);

  // plantList 값 보기(디버깅)   // 셀렉터에 들어온 식물이름 확인
  useEffect(() => {
    console.log("[디버그] plantList:", plantList);
  }, [plantList]);

  // 식물 추가 (중복 방지)
  const handleAddPlant = () => {
    const plant = plantList.find((p) => p.cntntsNo === selectedPlantId);
    if (plant && !selectedPlants.some((p) => p.cntntsNo === plant.cntntsNo)) {
      setSelectedPlants((prev) => [...prev, plant]);
    }
  };

  // 태그에서 식물 제거
  const handleRemovePlant = (id: string) => {
    setSelectedPlants((prev) => prev.filter((p) => p.cntntsNo !== id));
  };

  if (isLoading) return <div>식물 목록 불러오는 중...</div>;
  if (error) return <div>식물 목록을 불러오는 데 실패했습니다.</div>;
  if (!plantList.length) return <div>등록한 식물이 없습니다.</div>;


  return (
    <SelectWrapper>
      <SelectRow>
        <Select
          value={selectedPlantId ?? ""}
          onChange={(e) => setSelectedPlantId(e.target.value)}
        >
          {plantList.map((plant) => (
            <option key={plant.cntntsNo} value={plant.cntntsNo}>
              {plant.cntntsSj}
            </option>
          ))}
        </Select>
        <AddTagButton onClick={handleAddPlant}>추가</AddTagButton>
      </SelectRow>

      {/* <TagList>
        {selectedPlants.map((plant) => (
          <AddedTag key={plant.cntntsNo}>
            {plant.cntntsSj}
            <TagRemoveButton onClick={() => handleRemovePlant(plant.cntntsNo)} />
          </AddedTag>
        ))}
      </TagList> */}
    </SelectWrapper>
  );
};

export default PlantSelector2;
