// interface : 회사 부가정보 (출퇴근시간) //
export interface ICommutingTime {
  // description : 최소 출근 시간 //
  minimumOfficeHour: string;

  // description : 최대 출근 시간 //
  maximumOfficeHour: string;

  // description : 최소 퇴근 시간 //
  minimumLeaveHour: string;

  // description : 최대 퇴근 시간 //
  maximumLeaveHour: string;

  // description : 최소 근무 시간(점심시간 제외) //
  workingTime: number;

  // description : 점심시간(1시간 === 1로 표현, 2022.08.18 현재 사용X) //
  lunchTime: number;
}
