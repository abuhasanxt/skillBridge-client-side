"use client";

import { createAvailability } from "@/services/availability.service";
import { useState } from "react";
import { toast } from "sonner";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function CreateAvailabilityForm() {
  const [day, setDay] = useState("SUN");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startTime || !endTime) {
      toast.error("Start and End time required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        day,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
      };

      const res = await createAvailability(payload);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("Availability created!");

      setStartTime("");
      setEndTime("");
      setDay("SUN");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        Create Availability
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Day */}
        <div>
          <label className="block text-sm mb-1">Day</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full text-green-600 border px-3 py-2 rounded-md"
          >
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm mb-1">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm mb-1">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Create Availability"}
        </button>
      </form>
    </div>
  );
}
