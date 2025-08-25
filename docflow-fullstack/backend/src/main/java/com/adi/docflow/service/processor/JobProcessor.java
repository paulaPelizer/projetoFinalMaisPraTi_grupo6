package com.adi.docflow.service.processor;

import com.adi.docflow.model.AutomationJob;
import com.adi.docflow.job.JobType;

public interface JobProcessor {
    JobType getType();
    void process(AutomationJob job) throws Exception;
}
