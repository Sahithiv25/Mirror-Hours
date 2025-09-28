import { toZonedTime } from 'date-fns-tz';

interface FairnessRecord {
  memberName: string;
  inconveniencePoints: number;
  lastInconvenientMeeting?: Date;
}

interface EmpathyImpact {
  type: 'positive' | 'neutral' | 'negative';
  message: string;
}

interface EmpathyAssignment {
  assignedTo: string;
  reason: string;
}

class FairnessEngine {
  private records: Map<string, FairnessRecord> = new Map();

  calculateInconvenienceScore(slot: any, members: any[]): number {
    let totalScore = 0;
    
    slot.participants.forEach((participantName: string) => {
      const member = members.find(m => m.name === participantName);
      if (!member) return;

      const localHour = this.getLocalHour(slot.start, member.timezone);
      let score = 0;

      // Score based on local time inconvenience
      if (localHour < 7 || localHour > 20) score += 3;
      else if (localHour < 9 || localHour > 18) score += 2;
      else if (localHour === 12) score -= 1;

      // Score based on workstyle mismatch
      if (member.workStyle === 'early_bird' && localHour > 15) score += 2;
      if (member.workStyle === 'night_owl' && localHour < 10) score += 2;

      totalScore += score;
    });

    return totalScore;
  }

  getEmpatheticAssignment(slot: any, members: any[]): EmpathyAssignment {
    // Find participant with lowest inconvenience points
    const participantRecords = slot.participants.map((name: string) => {
      const record = this.records.get(name) || { memberName: name, inconveniencePoints: 0 };
      return record;
    });

    // Add explicit types to the reduce parameters
    const bestCandidate = participantRecords.reduce((prev: FairnessRecord, curr: FairnessRecord) => 
      prev.inconveniencePoints < curr.inconveniencePoints ? prev : curr
    );

    const member = members.find(m => m.name === bestCandidate.memberName);
    const localHour = member ? this.getLocalHour(slot.start, member.timezone) : 12;
    
    let reason = `${bestCandidate.memberName} has the lowest inconvenience points`;
    if (localHour < 7 || localHour > 20) {
      reason += ` (taking one for the team outside normal hours)`;
    }

    return {
      assignedTo: bestCandidate.memberName,
      reason
    };
  }

  getEmpathyImpact(slot: any, members: any[], currentReport: any[]): EmpathyImpact[] {
    const impacts: EmpathyImpact[] = [];
    const assignment = this.getEmpatheticAssignment(slot, members);

    // Impact on assigned person
    const assignedRecord = currentReport.find(r => r.memberName === assignment.assignedTo);
    const newPoints = (assignedRecord?.inconveniencePoints || 0) + this.calculateInconvenienceScore(slot, members);
    
    impacts.push({
      type: newPoints > 10 ? 'negative' : 'neutral',
      message: `${assignment.assignedTo} will gain +${this.calculateInconvenienceScore(slot, members)} points (total: ${newPoints})`
    });

    // Impact on team balance
    const maxPoints = currentReport.length > 0 
      ? Math.max(...currentReport.map(r => r.inconveniencePoints))
      : 0;
      
    if (newPoints <= maxPoints) {
      impacts.push({
        type: 'positive',
        message: `This maintains fair balance across the team`
      });
    } else {
      impacts.push({
        type: 'negative', 
        message: `This might create imbalance - ${assignment.assignedTo} would have the most points`
      });
    }

    // Timezone empathy note
    slot.participants.forEach((participant: string) => {
      const member = members.find(m => m.name === participant);
      if (member) {
        const localHour = this.getLocalHour(slot.start, member.timezone);
        if (localHour < 7 || localHour > 20) {
          impacts.push({
            type: 'negative',
            message: `${participant} would be at ${localHour}:00 local time`
          });
        }
      }
    });

    return impacts;
  }

  recordMeeting(slot: any, assignedTo: string) {
    if (!this.records.has(assignedTo)) {
      this.records.set(assignedTo, { memberName: assignedTo, inconveniencePoints: 0 });
    }
    
    const record = this.records.get(assignedTo)!;
    record.inconveniencePoints += this.calculateInconvenienceScore(slot, []);
    record.lastInconvenientMeeting = new Date();
  }

  getFairnessReport() {
    return Array.from(this.records.values());
  }

  private getLocalHour(utcDate: Date, timezone: string): number {
    const localDate = toZonedTime(utcDate, timezone);
    return localDate.getHours();
  }
}

export const fairnessEngine = new FairnessEngine();