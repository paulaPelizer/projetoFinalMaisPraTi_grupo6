package com.adi.docflow.service.processor;

import com.adi.docflow.job.JobType;
import com.adi.docflow.model.AutomationJob;
import org.springframework.stereotype.Component;

@Component
public class ImportDocumentsProcessor implements JobProcessor {

    @Override
    public JobType getType() {
        return JobType.IMPORT_DOCUMENTS;
    }

    @Override
    public void process(AutomationJob job) throws Exception {
        // TODO: plugar integração (ex.: Box/SharePoint/cliente) usando o payload.
        Thread.sleep(500);
    }
}
