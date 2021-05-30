// Generated code from Butter Knife. Do not modify!
package com.haerul.foodsapp.view.category;

import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import androidx.recyclerview.widget.RecyclerView;
import butterknife.Unbinder;
import butterknife.internal.DebouncingOnClickListener;
import butterknife.internal.Utils;
import com.haerul.foodsapp.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class CategoryFragment_ViewBinding implements Unbinder {
  private CategoryFragment target;

  private View view7f080026;

  @UiThread
  public CategoryFragment_ViewBinding(final CategoryFragment target, View source) {
    this.target = target;

    View view;
    target.recyclerView = Utils.findRequiredViewAsType(source, R.id.recyclerView, "field 'recyclerView'", RecyclerView.class);
    target.progressBar = Utils.findRequiredViewAsType(source, R.id.progressBar, "field 'progressBar'", ProgressBar.class);
    target.imageCategory = Utils.findRequiredViewAsType(source, R.id.imageCategory, "field 'imageCategory'", ImageView.class);
    target.imageCategoryBg = Utils.findRequiredViewAsType(source, R.id.imageCategoryBg, "field 'imageCategoryBg'", ImageView.class);
    target.textCategory = Utils.findRequiredViewAsType(source, R.id.textCategory, "field 'textCategory'", TextView.class);
    view = Utils.findRequiredView(source, R.id.cardCategory, "method 'onClick'");
    view7f080026 = view;
    view.setOnClickListener(new DebouncingOnClickListener() {
      @Override
      public void doClick(View p0) {
        target.onClick();
      }
    });
  }

  @Override
  @CallSuper
  public void unbind() {
    CategoryFragment target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.recyclerView = null;
    target.progressBar = null;
    target.imageCategory = null;
    target.imageCategoryBg = null;
    target.textCategory = null;

    view7f080026.setOnClickListener(null);
    view7f080026 = null;
  }
}
